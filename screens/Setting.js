import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import CustomButton from '../components/CustomButton';
import { ThemeContext } from '../contexts/ThemeContext';
import { spacing } from '../styles/styleHelper';

const Settings = () => {
  const { colors, toggleTheme } = useContext(ThemeContext);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <CustomButton title="Toggle Theme" onPress={toggleTheme} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.medium,
  },
});

export default Settings;