import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from './contexts/ThemeContext';
import RootStackNavigator from './navigation/RootStackNavigator';
import { AppRegistry } from 'react-native';

const App = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <RootStackNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
};

AppRegistry.registerComponent('main', () => App);

export default App;
