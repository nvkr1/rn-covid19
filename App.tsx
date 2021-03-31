/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import axios from 'axios';

import Api from './src/api/Api';

import CountryDataContext from './src/context/country-data-context';
import WorldDataContext from './src/context/world-data-context';
import MainScreen from './src/screens/main-screen';

const App = () => {
  /* =====
    States
  ======*/
  const [countryData, setCountryData] = useState<IStatsRecord[] | null>(null);
  const [worldData, setWorldData] = useState<IWorldData[] | null>(null);

  /* =====
    Utilities
  ======*/

  // fetch world data
  const refreshWorldData = async (): Promise<void> => {
    const data: IWorldData[] = await Api.fetchWorldData();
    console.log(`wd ${data.length}`);
    setWorldData(data);
  };

  // fetch country data
  const refreshCountryData = async (): Promise<void> => {
    const data: IStatsRecord[] = await Api.fetchCountryData();
    console.log(`cd ${data.length}`);
    setCountryData(data);
  };

  /* =====
    Side Effects
  ======*/
  // onMount
  useEffect(() => {
    refreshWorldData();
    refreshCountryData();
  }, []);

  return (
    <>
      <WorldDataContext.Provider
        value={{data: worldData, refresh: refreshWorldData}}>
        <CountryDataContext.Provider
          value={{data: countryData, refresh: refreshCountryData}}>
          <NavigationContainer>
            <MainScreen />
          </NavigationContainer>
        </CountryDataContext.Provider>
      </WorldDataContext.Provider>
    </>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
