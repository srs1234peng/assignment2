import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import CustomButton from '../components/CustomButton';
import { ThemeContext } from '../contexts/ThemeContext';
import colors from '../styles/colors';
import spacing from '../styles/spacing';

const Settings = () => {
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <View style={styles.container}>
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
    backgroundColor: colors.background,
  },
});

export default Settings;
