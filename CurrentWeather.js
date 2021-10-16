import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import * as ApiCaller from './ApiCaller';
import { PollutionHistory } from './PollutionHistory';
import { Storage } from 'expo-storage';

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
  const [date, setDate] = useState(getFormattedDate(new Date));

  const [database, setDatabase] = useState(0);



  useEffect(() => {
    const database = new PollutionHistory();
    setDatabase(database);
  }, [])

  useEffect(() => {
    //Get coordinates and call Weather API on successfully getting coordinates.
    ApiCaller.getPosition(async (position) => {
      let currentWeatherData = await ApiCaller.getCurrentWeather(position.coords.latitude, position.coords.longitude);
      let pollutionData = await ApiCaller.getAirPollution(position.coords.latitude, position.coords.longitude);

      if (pollutionData !== undefined) {
        setPollution(pollutionData.list[0].main.aqi)
        savePollutionData(pollutionData.list[0].dt, pollutionData.list[0].main.aqi);
      }

      if (currentWeatherData !== undefined) {
        let iconId = currentWeatherData.weather[0].icon;

        setTemp(currentWeatherData.main.temp.toPrecision(2));
        setIcon(`https://openweathermap.org/img/wn/${iconId}@2x.png`);
        setDescription(currentWeatherData.weather[0].description);
        setCity(currentWeatherData.name);
        setSunrise(convertUnixTimeToDate(currentWeatherData.sys.sunrise));
        setSunset(convertUnixTimeToDate(currentWeatherData.sys.sunset));
        setWind(currentWeatherData.wind.speed);
        setHumidity(currentWeatherData.main.humidity);
      }
    });

  }, [icon])

  const leftPad = (value, length) => value.toString().length < length ? leftPad("0" + value, length) : value;

  function convertUnixTimeToDate(unixtime) {
    let date = new Date(unixtime * 1000)
    let hours = leftPad(date.getUTCHours(), 2);
    let minutes = leftPad(date.getUTCMinutes(), 2);

    let timeInDateFormat = `${hours}:${minutes}`

    return timeInDateFormat;
  }

  function getFormattedDate(date) {
    let month = date.toLocaleString('default', { month: 'long' });
    let formattedDate = `${date.getUTCDate()} ${month} - ${date.getFullYear()}`;
    return formattedDate;
  }

  function savePollutionData(unixtime, aqi) {
    let latestPollution = database.getLatestPollution();
    if (latestPollution != undefined) {
      console.log(`POLLUTION : ${latestPollution}`);
      console.log(database);
      if (latestPollution == []) { pollution.add(unixtime, aqi); }
      const DAY_HAS_PASSED = (unixtime, latestPollution) => { unixtime - latestPollution.time > (60 * 60 * 24) } //Use UNIX CONSTANT later

      if (aqi !== latestPollution.aqi || DAY_HAS_PASSED) {
        pollution.add(unixtime, aqi);
      }
    } else { console.error("Could not find latest pollution data.") }
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
          <Image source={require("./assets/sunrise.png")} style={{ width: 84, height: 36 }} />
          <Text style={styles.h2}>Sunrise</Text>
          <Text style={styles.h1}>{sunrise}</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Image source={require("./assets/sunset.png")} style={{ width: 84, height: 36 }} />
          <Text style={styles.h2}>Sunset</Text>
          <Text style={styles.h1}>{sunset}</Text>
        </View>
      </View>
      <Text style={styles.h2}>Current pollution level:</Text>
      <Text style={styles.h2}>{pollution}</Text>
      <StatusBar style="auto" />
    </View >
  );
}

//Perhaps change pollution text to change color depending on danger level.

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
