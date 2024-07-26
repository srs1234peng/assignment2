import React, { useState } from 'react';
import { Pressable, Text, StyleSheet, Platform } from 'react-native';
import { colors, spacing, typography } from '../styles/styleHelper';

const CustomButton = ({ onPress, title }) => {
  const [isPressed, setIsPressed] = useState(false);

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
      <Text style={styles.text}>{title}</Text>
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
    color: colors.textLight,
    fontSize: typography.button,
  },
});

export default CustomButton;
