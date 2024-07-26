import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Modal, Button, Alert } from "react-native";
import Checkbox from "expo-checkbox";
import DateTimePicker from "@react-native-community/datetimepicker";
import SearchableDropdown from "react-native-searchable-dropdown";
import CustomButton from "./CustomButton";
import { colors, spacing, typography } from "../styles/styleHelper";

const ActivityForm = ({ onSubmit, initialData = {} }) => {
  const initialDate = initialData.date && initialData.date.seconds
    ? new Date(initialData.date.seconds * 1000)
    : new Date();

  const [activity, setActivity] = useState(initialData.activity || "");
  const [date, setDate] = useState(initialDate);
  const [duration, setDuration] = useState(initialData.duration || 0);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isSpecial, setIsSpecial] = useState(initialData.special || false);
  const [manualOverride, setManualOverride] = useState(false);

  const [items] = useState([
    { id: 1, name: 'Walking' },
    { id: 2, name: 'Running' },
    { id: 3, name: 'Swimming' },
    { id: 4, name: 'Weights' },
    { id: 5, name: 'Yoga' },
    { id: 6, name: 'Cycling' },
    { id: 7, name: 'Hiking' },
  ]);

  useEffect(() => {
    if (!manualOverride) {
      if (duration > 60) {
        setIsSpecial(true);
      } else {
        setIsSpecial(false);
      }
    }
  }, [activity, duration, manualOverride]);

  const handleSave = () => {
    if (!activity || !date || !duration) {
      Alert.alert('Error', 'Please fill out all fields');
      return;
    }
    console.log('Form values on save:', { activity, date, duration, special: isSpecial });
    onSubmit({ activity, date, duration, special: isSpecial });
  };

  const handleActivityChange = (item) => {
    setActivity(item.name);
    setManualOverride(false);
  };

  const handleDurationChange = (text) => {
    const newDuration = Number(text);
    setDuration(newDuration);
    setManualOverride(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Activity</Text>
      <SearchableDropdown
        onItemSelect={handleActivityChange}
        containerStyle={styles.dropdownContainer}
        itemStyle={styles.dropdownItem}
        itemTextStyle={styles.dropdownItemText}
        itemsContainerStyle={styles.dropdownItemsContainer}
        items={items}
        resetValue={false}
        textInputProps={{
          placeholder: activity ? activity : "Select an activity",
          underlineColorAndroid: "transparent",
          style: styles.dropdownTextInput,
          value: activity,
        }}
        listProps={{
          nestedScrollEnabled: true,
        }}
      />
      <Text style={styles.label}>Date</Text>
      <Text
        style={styles.input}
        onPress={() => setShowDatePicker(true)}
      >
        {date.toDateString()}
      </Text>
      <Modal
        transparent={true}
        visible={showDatePicker}
        onRequestClose={() => setShowDatePicker(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
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
            <Button title="Close" onPress={() => setShowDatePicker(false)} />
          </View>
        </View>
      </Modal>
      <Text style={styles.label}>Duration</Text>
      <TextInput
        style={styles.input}
        value={String(duration)}
        onChangeText={handleDurationChange}
        keyboardType="numeric"
      />
      {initialData.special !== undefined && (
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={isSpecial}
            onValueChange={(newValue) => {
              setIsSpecial(newValue);
              setManualOverride(true);
              console.log('Checkbox value changed to:', newValue);
            }}
            color={colors.primary}
          />
          <Text style={styles.checkboxLabel}>Select this item if you agree that it is special.</Text>
        </View>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: spacing.medium,
    borderRadius: spacing.small,
  },
  dropdownContainer: {
    marginBottom: spacing.medium,
  },
  dropdownItem: {
    padding: spacing.small,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
  },
  dropdownItemText: {
    color: colors.text,
  },
  dropdownItemsContainer: {
    maxHeight: 200,
  },
  dropdownTextInput: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: spacing.small,
    padding: spacing.small,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.medium,
  },
  checkboxLabel: {
    marginLeft: spacing.small,
    fontSize: typography.body,
    color: colors.text,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ActivityForm;
