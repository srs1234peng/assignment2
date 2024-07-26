import React, { createContext, useState, useMemo } from 'react';
import { colors as lightColors } from '../styles/styleHelper';

const darkColors = {
  ...lightColors,
  background: lightColors.backgroundDark,
  text: lightColors.textLight,
};

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const toggleTheme = () => {
    setIsDarkTheme(prevTheme => !prevTheme);
  };

  const theme = useMemo(() => ({
    isDarkTheme,
    colors: isDarkTheme ? darkColors : lightColors,
    toggleTheme,
  }), [isDarkTheme]);

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};
