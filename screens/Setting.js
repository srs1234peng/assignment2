import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';

const Setting = () => {
    const { theme } = useContext(ThemeContext);
    return (
        <View style={[styles.container, {
            backgroundColor: theme.backgroundColor }]}>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
});

export default Setting;
