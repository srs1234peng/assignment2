import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from './contexts/ThemeContext';
import RootStackNavigator from './navigation/RootStackNavigator';

const App = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <RootStackNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;