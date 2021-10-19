import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import * as ApiCaller from '../backend/ApiCaller';
import DatabaseContext from '../contexts/DatabaseContext';
import * as Util from '../utility/utilFunctions';

export default function App() {
  const [temp, setTemp] = useState(0);
  const [icon, setIcon] = useState(0);
  const [description, setDescription] = useState(0);
  const [city, setCity] = useState(0);
  const [sunrise, setSunrise] = useState(0);
  const [sunset, setSunset] = useState(0);
  const [wind, setWind] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [pollution, setPollution] = useState(0);

  const [avgPollution, setAvgPollution] = useState(0);
  const [weekPollution, setWeekPollution] = useState([]);
  const [table, setTable] = useState(0);  //Change name later

  const [date, setDate] = useState(Util.getFormattedDate(new Date));
  const database = useContext(DatabaseContext);

  useEffect(() => {
    //Get coordinates and call Weather API on successfully getting coordinates.

    Util.refreshLocation().then(async (position) => {
      if (position == undefined) {
        console.error("Could not get position!");
        return;
      }

      ApiCaller.getCurrentWeather(position.coords.latitude, position.coords.longitude)
        .then((currentWeatherData) => {
          if (currentWeatherData == undefined) {
            console.error("Could not get weather data!");
            return;
          }

          let iconId = currentWeatherData.weather[0].icon;

          setTemp(currentWeatherData.main.temp.toPrecision(2));
          setIcon(`https://openweathermap.org/img/wn/${iconId}@2x.png`);
          setDescription(currentWeatherData.weather[0].description);
          setCity(currentWeatherData.name);
          setSunrise(Util.convertUnixTimeToDate(currentWeatherData.sys.sunrise));
          setSunset(Util.convertUnixTimeToDate(currentWeatherData.sys.sunset));
          setWind(currentWeatherData.wind.speed);
          setHumidity(currentWeatherData.main.humidity);

        });
      ApiCaller.getAirPollution(position.coords.latitude, position.coords.longitude)
        .then((pollutionData) => {
          if (pollutionData !== undefined) {
            setPollution(pollutionData.list[0].main.aqi)
            savePollutionData(pollutionData.list[0].dt, pollutionData.list[0].main.aqi);
          }
        });
    })


  }, [])

  useEffect(() => {
    let pollutionData = createWeekPollutionElements(weekPollution);
    setTable(pollutionData);

  }, [weekPollution]);

  function savePollutionData(unixtime, aqi) {
    let latestPollution = database.getLatestPollution();
    const DAY_HAS_PASSED = unixtime - latestPollution.time > (60 * 60 * 24); //Use UNIX CONSTANT later

    console.log("Attempting to save data: ");
    if (latestPollution == undefined) {
      console.error("Could not find latest pollution data.")
      return;
    }

    if (latestPollution.length == 0 || aqi !== latestPollution.aqi || DAY_HAS_PASSED) {
      console.log("Added to db");
      database.add(unixtime, aqi);
    }
  }

  function createWeekPollutionElements(data) {
    let items = [];
    let dayName = { 0: "Mon", 1: "Tue", 2: "Wed", 3: "Thu", 4: "Fri", 5: "Sat", 6: "Sun" };
    for (let name in dayName) {
      items.push(
        <View key={name} style={{ minWidth: '50px', padding: 10, alignItems: 'center', border: "solid 1px black" }}>
          <Text style={styles.h3}>{dayName[name]}</Text>
          <Text style={styles.h3}>{data.length <= name ? "0" : data[name]}</Text>
        </View>
      );
    }
    return items;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>{date}</Text>
      <Text style={styles.h3}>{city}</Text>
      <Image source={{ uri: icon }} style={{ width: 100, height: 100 }} />
      <Text style={styles.h1}>{temp} ° C</Text>
      <Text style={styles.h2}>{description}</Text>

      <View style={styles.row}>
        <Text style={styles.h3}>{wind} m/s</Text>
        <Text style={styles.h3}>{humidity} %</Text>
      </View>

      <View style={[styles.row, { backgroundColor: 'hsla(360,23%,9%,0.27)' }]}>
        <View style={{ alignItems: 'center' }}>
          <Image source={require("../assets/sunrise.png")} style={{ width: 84, height: 36 }} />
          <Text style={styles.h2}>Sunrise</Text>
          <Text style={styles.h1}>{sunrise}</Text>
        </View>

        <View style={{ alignItems: 'center' }}>
          <Image source={require("../assets/sunset.png")} style={{ width: 84, height: 36 }} />
          <Text style={styles.h2}>Sunset</Text>
          <Text style={styles.h1}>{sunset}</Text>
        </View>
      </View>

      <Text style={styles.h2}>Current pollution level:</Text>
      <Text style={styles.h2}>{pollution}</Text>
      <TouchableOpacity style={{ margin: 15, backgroundColor: "#e07070", borderRadius: 15, padding: 20 }} onPress={() => {
        setAvgPollution(database.getAveragePollution(Math.floor(Date.now() / 1000 - (24 * 60 * 60))))
      }
      }>
        <Text>Get average pollution of today</Text>
      </TouchableOpacity>
      <Text style={styles.h1}>{avgPollution}</Text>
      <TouchableOpacity style={{ margin: 15, backgroundColor: "#e07070", borderRadius: 15, padding: 20 }} onPress={() => {
        setWeekPollution(database.getPollutionWeekChart(Math.floor(Date.now() / 1000 - (24 * 60 * 60))))
      }
      }>
        <Text>Update weekly pollution chart</Text>
      </TouchableOpacity>

      <View style={{ width: "100%" }}>
        <View style={styles.table} >
          {table}
        </View>
      </View >
      <StatusBar style="auto" />
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6F9CF4',
    alignItems: 'center',
    justifyContent: 'center',

  },
  row: {
    margin: 15,
    padding: 25,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around'

  },
  table: {
    marginTop: 40,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 20,
    backgroundColor: "hsla(360,23%,9%,0.27)"
  },
  h1: {
    fontSize: 35,
    color: '#FFFFFF'
  },
  h2: {
    fontSize: 20,
    color: '#FFFFFF'
  },
  h3: {
    fontSize: 15,
    color: '#FFFFFF'
  }
});
