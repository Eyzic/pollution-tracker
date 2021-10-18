import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
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
      <ScrollView>
        <View style={styles.container}>
          {isLoading ? <Text>Loading data...</Text> : <MainPage />}
        </View >
      </ScrollView>
    </DatabaseContext.Provider>
  );
}

//Perhaps change pollution text to change color depending on danger level.

const styles = StyleSheet.create({
  container: {
    paddingTop: 45,
    paddingBottom: 45,
    flex: 1,
    backgroundColor: '#6F9CF4',
    justifyContent: 'center',
  }
});
