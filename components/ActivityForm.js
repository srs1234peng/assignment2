import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Modal, Button } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import DropDownPicker from "react-native-dropdown-picker";
import CustomButton from "./CustomButton";
import colors from "../styles/colors";
import spacing from "../styles/spacing";
import typography from "../styles/typography";

const ActivityForm = ({ onSubmit, initialData = {} }) => {
  const [activity, setActivity] = useState(initialData.activity || "");
  const [date, setDate] = useState(initialData.date || new Date());
  const [duration, setDuration] = useState(initialData.duration || 0);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(activity);
  const [items, setItems] = useState([
    { label: 'Walking', value: 'Walking' },
    { label: 'Running', value: 'Running' },
    { label: 'Swimming', value: 'Swimming' },
    { label: 'Weights', value: 'Weights' },
    { label: 'Yoga', value: 'Yoga' },
    { label: 'Cycling', value: 'Cycling' },
    { label: 'Hiking', value: 'Hiking' },
  ]);

  const handleSave = () => {
    console.log('Form values on save:', { activity, date, duration });
    if (!activity || !date || !duration) {
      alert('Please fill out all fields');
      return;
    }
    onSubmit({ activity, date, duration });
  };

  const handleActivityChange = (val) => {
    console.log('Selected activity:', val);
    setValue(val);
    setActivity(val);
    console.log('Updated activity state:', val);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Activity</Text>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={handleActivityChange}
        setItems={setItems}
        placeholder="Select an activity"
        containerStyle={styles.dropdownContainer}
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownPicker}
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
  dropdown: {
    borderColor: colors.primary,
  },
  dropdownPicker: {
    borderColor: colors.primary,
  },
});

export default ActivityForm;
