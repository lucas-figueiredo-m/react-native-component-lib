import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './HomeScreen';

import Inputs from './Inputs';
import DrawerScreen from './DrawerScreen';
import ActionButtonScreen from './ActionButtonScreen';
import NavBarScreen from './NavBarScreen';
import PickerScreen from './PickerScreen';

export default App = () => {

    const Stack = createStackNavigator();

    return(
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} >

        <Stack.Screen name="homeScreen" component={HomeScreen} />
        <Stack.Screen name="actionButtonScreen" component={ActionButtonScreen} />
        <Stack.Screen name="drawerScreen" component={DrawerScreen} />
        <Stack.Screen name="navBarScreen" component={NavBarScreen} />
        <Stack.Screen name="inputs" component={Inputs} />
        <Stack.Screen name="pickerScreen" component={PickerScreen} />

      </Stack.Navigator>
    </NavigationContainer>
    )
}