import * as React from 'react';
import { useEffect } from 'react'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './components/Home';
import Draft from './components/Draft';
import LoginForm from './components/LoginForm';
import ScoreDash from './components/Dashboard';
import Leaderboard from './components/Leaderboard';
import DashboardScreen from './components/Test';
import SignUpForm from './components/SignUpForm';
import Individual from './components/Individual';
import MyDrawer from './components/Drawer';
import Chat from './components/Chat';
import * as SQLite from 'expo-sqlite/legacy'



const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginForm">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Draft" component={Draft} />
        <Stack.Screen name="LoginForm" component={LoginForm} />
        <Stack.Screen name="Dashboard" component={ScoreDash} />
        <Stack.Screen name="Individual" component={Individual} />
        <Stack.Screen name="Test" component={DashboardScreen} />
        <Stack.Screen name="SignUp" component={SignUpForm} />
        <Stack.Screen name="Drawer" component={MyDrawer} />
        <Stack.Screen name="Chat" component={Chat} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App
