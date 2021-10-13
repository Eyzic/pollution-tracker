import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import * as ApiCaller from './ApiCaller';

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

  useEffect(() => {
    //Get coordinates and call Weather API on successfully getting coordinates.
    ApiCaller.getPosition(async (position) => {
      let currentWeather = await ApiCaller.getCurrentWeather(position.coords.latitude, position.coords.longitude);
      let pollutionObject = await ApiCaller.getAirPollution(position.coords.latitude, position.coords.longitude, Date.now());

      setPollution(pollutionObject.list[0].main.aqi)
      let iconId = currentWeather.weather[0].icon;

      // Set all api-related data.
      setTemp(currentWeather.main.temp);
      setIcon(`https://openweathermap.org/img/wn/${iconId}@2x.png`);
      setDescription(currentWeather.weather[0].description);
      setCity(currentWeather.name);

      setSunrise(currentWeather.sys.sunrise);   //Omvandla från UNIX time till xx:xx
      setSunset(currentWeather.sys.sunset);     //Omvandla från UNIX time till xx:xx

      setWind(currentWeather.wind.speed);
      setHumidity(currentWeather.main.humidity);
    });

  }, [icon])



  return (
    <View style={styles.container}>
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
          <Text>{sunrise}</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Image source={require("./assets/sunset.png")} style={{ width: 84, height: 36 }} />
          <Text style={styles.h2}>Sunset</Text>
          <Text>{sunset}</Text>
        </View>
      </View>
      <Text style={styles.h2}>Current pollution level:</Text>
      <Text style={styles.h2}>{pollution}</Text>  {/*Change color according to danger level of pollution*/}
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