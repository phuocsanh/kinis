import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginAndRegisterScreen} from 'screens/auth/LoginScreen';
const Stack = createNativeStackNavigator();

export default function AuthGroup() {
  return (
    <Stack.Group>
      <Stack.Screen
        name="LoginAndRegisterScreen"
        component={LoginAndRegisterScreen}
      />
    </Stack.Group>
  );
}
