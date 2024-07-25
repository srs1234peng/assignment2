import React, { useState } from "react";
import { View, Text,TextInput, StyleSheet, Modal, Button } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import CustomButton from "./CustomButton";
import colors from "../styles/colors";
import spacing from "../styles/spacing";
import typography from "../styles/typography";

const DietForm = ({ onSubmit, initialData = {} }) => {
    const [description, setDescription] = useState(initialData.description || '');
    const [calories, setCalories] = useState(initialData.calories || '');
    const [date, setDate] = useState(initialData.date || new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
  
    const handleSave = () => {
      if (!description || !calories || !date) {
        alert('Please fill out all fields');
        return;
      }
      onSubmit({ description, calories, date });
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={setDescription}
          placeholder="Enter description"
        />
        <Text style={styles.label}>Calories</Text>
        <TextInput
          style={styles.input}
          value={calories}
          onChangeText={setCalories}
          placeholder="Enter calories"
          keyboardType="numeric"
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
  });
  
  export default DietForm;
  