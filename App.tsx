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

import CountryDataContext from './src/context/country-data-context';
import WorldDataContext from './src/context/world-data-context';
import MainScreen from './src/screens/main-screen';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>loading...</Text>
      </View>
    );
  }

  return (
    <>
      <WorldDataContext.Provider value={{data: []}}>
        <CountryDataContext.Provider value={{data: []}}>
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
