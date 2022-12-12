import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from "./screens/HomeScreen";
import List from './screens/List';
import Register from './screens/Register';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false, }}>
          <Stack.Screen name='HomeScreen' component={HomeScreen}/>
          <Stack.Screen name='List' component={List}/>
          <Stack.Screen name='Register' component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

