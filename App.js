import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as ApiCaller from './backend/ApiCaller';
import { PollutionHistory } from './backend/PollutionHistory';
import MainPage from './screens/CurrentWeather';
import DatabaseContext from './DatabaseContext';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const database = new PollutionHistory();

  useEffect(() => {
    setIsLoading(!database.init("test"));
  }, [])

  return (
    <DatabaseContext.Provider value={database}>
      <View style={styles.container}>
        {isLoading ? <Text>Loading data...</Text> : <MainPage />}
      </View >
    </DatabaseContext.Provider>
  );
}

//Perhaps change pollution text to change color depending on danger level.

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6F9CF4',
    justifyContent: 'center',
  }
});
