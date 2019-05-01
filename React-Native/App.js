import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator , createAppContainer , createDrawerNavigator ,createMaterialTopTabNavigator, createBottomTabNavigator,
StackNavigator,
createSwitchNavigator,  } from 'react-navigation';

import GameOverScreen from './GameOverScreen.js'
import Snake from './Snake.js'
import LoginScreen from './LoginScreen.js';
import Home from './Home.js'
import StartGame from './StartGame.js'

export default class App extends React.Component {
  render() {
    return (

      <AppContainer />
     //<AppDrawContainer />

    );
  }
}

const AppDrawerNavigator2 = createDrawerNavigator(
{   "Home": Home,
    "Login": LoginScreen,
    "Start": StartGame,
    "Snake": Snake,
    "GameOver": GameOverScreen,
}
);

const AppDrawerNavigator = createSwitchNavigator(
  {
    "Home": Home,
    "Login": LoginScreen,
    "Start": StartGame,
    "Snake": Snake,
    "GameOver": GameOverScreen,
  },
  {
    "initialRouteName": "Home"
  }
);

//const AppDrawContainer = createAppContainer(AppDrawerNavigator);
const AppContainer = createAppContainer(AppDrawerNavigator2);

