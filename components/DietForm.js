import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Modal, Button, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { colors, spacing, typography } from '../styles/styleHelper';
import CustomButton from './CustomButton';

const DietForm = ({ onSubmit, initialData = {} }) => {
  const [description, setDescription] = useState(initialData.description || '');
  const [calories, setCalories] = useState(initialData.calories || '');
  const [date, setDate] = useState(initialData.date ? new Date(initialData.date.seconds * 1000) : new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSave = () => {
    if (!description || !calories || !date) {
      Alert.alert('Error', 'Please fill out all fields');
      return;
    }
    if (isNaN(calories) || calories <= 0) {
      Alert.alert('Error', 'Calories must be a positive number');
      return;
    }
    onSubmit({ description, calories: Number(calories), date });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />
      <Text style={styles.label}>Calories</Text>
      <TextInput
        style={styles.input}
        value={String(calories)}
        onChangeText={(text) => setCalories(Number(text))}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Date</Text>
      <Text style={styles.input} onPress={() => setShowDatePicker(true)}>
        {date.toDateString()}
      </Text>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="inline"
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || date;
            setShowDatePicker(false);
            setDate(currentDate);
          }}
        />
      )}
      <View style={styles.buttonContainer}>
        <CustomButton title="Save" onPress={handleSave} />
        <CustomButton title="Cancel" onPress={() => {}} /> 
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.medium,
  },
  label: {
    fontSize: typography.body,
    color: colors.text,
    marginBottom: spacing.small,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: spacing.small,
    padding: spacing.small,
    marginBottom: spacing.medium,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default DietForm;
