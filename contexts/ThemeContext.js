import React, { createContext, useState } from 'react';
import {colors as lightColors} from '../styles/styleHelper';

const darkColors = {
    ...lightColors,
    backgroundColor: '#333',
    color: '#fff',
};

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(false);

    const toggleTheme = () => {
        setTheme((prevTheme) => !prevTheme);
    };

    return (
        <ThemeContext.Provider 
        value={{ 
            theme: theme ? darkColors : lightColors, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

