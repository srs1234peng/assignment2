import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Modal, Button, Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import SearchableDropdown from "react-native-searchable-dropdown";
import CustomButton from "./CustomButton";
import colors from "../styles/colors";
import spacing from "../styles/spacing";
import typography from "../styles/typography";

const ActivityForm = ({ onSubmit, initialData = {} }) => {
  const [activity, setActivity] = useState(initialData.activity || "");
  const [date, setDate] = useState(initialData.date || new Date());
  const [duration, setDuration] = useState(initialData.duration || 0);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [items] = useState([
    { id: 1, name: 'Walking' },
    { id: 2, name: 'Running' },
    { id: 3, name: 'Swimming' },
    { id: 4, name: 'Weights' },
    { id: 5, name: 'Yoga' },
    { id: 6, name: 'Cycling' },
    { id: 7, name: 'Hiking' },
  ]);

  const handleSave = () => {
    console.log('Form values on save:', { activity, date, duration });
    if (!activity || !date || !duration) {
      Alert.alert('Error', 'Please fill out all fields');
      return;
    }
    onSubmit({ activity, date, duration });
  };

  const handleActivityChange = (item) => {
    console.log('Selected activity:', item);
    setActivity(item.name);
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
          placeholder: "Select an activity",
          underlineColorAndroid: "transparent",
          style: styles.dropdownTextInput,
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
              display="default"
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
        onChangeText={text => setDuration(Number(text))}
        keyboardType="numeric"
      />
      <CustomButton title="Save" onPress={handleSave} />
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
});

export default ActivityForm;
