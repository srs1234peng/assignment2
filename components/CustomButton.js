import React, { useState, useContext } from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';
import { spacing, typography } from '../styles/styleHelper';

const CustomButton = ({ onPress, title }) => {
  const [isPressed, setIsPressed] = useState(false);
  const { colors } = useContext(ThemeContext);

  return (
    <Pressable
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      onPress={onPress}
      android_ripple={{ color: colors.primaryDark }}
      style={({ pressed }) => [
        {
          backgroundColor: pressed || isPressed ? colors.primaryDark : colors.primary,
        },
        styles.button,
      ]}
    >
      <Text style={[styles.text, { color: colors.text }]}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: spacing.medium,
    borderRadius: spacing.small,
    alignItems: 'center',
  },
  text: {
    fontSize: typography.button,
  },
});

export default CustomButton;
