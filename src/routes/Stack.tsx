import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/Login/index';
import WelcomeScreen from '../screens/Welcome/index';
import { PageName } from './PageName';
import Flexbox from '../screens/Flexbox/';

const Stack = createStackNavigator();

export const MyStack = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name={PageName.Flexbox} component={Flexbox} />
      <Stack.Screen name={PageName.Login} component={LoginScreen} />
      <Stack.Screen name={PageName.Welcome}  component={WelcomeScreen} />
    </Stack.Navigator>
  );
}
