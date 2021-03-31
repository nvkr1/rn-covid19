import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import StatisticsScreen from './statistics-screen';
import HomeScreen from './home-screen';

const Tab = createBottomTabNavigator();

const MainScreen: React.FC = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
      }}>
      <Tab.Screen
        name="/"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused, size, color}) => (
            <Icon size={size} color={color} name={'home'} />
          ),
        }}
      />
      <Tab.Screen
        name="/stats"
        component={StatisticsScreen}
        options={{
          tabBarIcon: ({focused, size, color}) => (
            <Icon size={size} color={color} name={'bar-chart'} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainScreen;
