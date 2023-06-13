import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Display from './Components/Pages/Display';
import Phone from './Components/Pages/Createaccount/Phone';
import Login from './Components/Pages/Login';
import Lphone from './Components/Pages/Login/Lphone';
import Otp from './Components/Pages/Createaccount/Otp';
import Name from './Components/Pages/Createaccount/Name';
import Home from './Components/Pages/Createaccount/Home';
const Stack = createStackNavigator();

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? 'black' : 'white',
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Display" component={Display} />
          <Stack.Screen name="Phone">
            {(props) => <Phone {...props} />}
          </Stack.Screen>
          <Stack.Screen name="Name" component={Name} />

          <Stack.Screen name="lphone" component={Lphone} />
          <Stack.Screen name="Otp" component={Otp} />
          <Stack.Screen name="Home" component={Home} />

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
