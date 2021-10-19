import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { PollutionHistory } from './backend/PollutionHistory';
import MainPage from './screens/CurrentWeather';
import DatabaseContext from './contexts/DatabaseContext';
import { runAllTests } from './test/unitTests';

export default function App() {
  const [isReady, setIsReady] = useState(true);
  const database = new PollutionHistory();

  useEffect(() => {
    runAllTests();
    setIsReady(database.init("test"));
  }, [])

  return (
    <DatabaseContext.Provider value={database}>
      <ScrollView>
        <View style={styles.container}>
          {isReady ? <MainPage /> : <Text>Loading data...</Text>}
        </View >
      </ScrollView>
    </DatabaseContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 45,
    paddingBottom: 45,
    flex: 1,
    backgroundColor: '#6F9CF4',
    justifyContent: 'center',
  }
});
