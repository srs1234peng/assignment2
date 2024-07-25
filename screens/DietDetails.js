import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Button from "./components/Button";
import { colors, spacing, typography } from "./styles";

const ActivityForm = ({onSubmit, initializeData = {}}) => {
    const [description, setDescription] = useState(initializeData.activity || "");
    const [date, setDate] = useState(initializeData.date || new Date());
    const [calories, setCalories] = useState(initializeData.calories || 0);

    const handleSave = () => {
        if (!description || !date || !calories) {
            // if any of the fields are empty, return early
            return;
        }
        onSubmit({ description, date, calories });
    };

    return (
        <View>
            <Text style={styles.label}>Description</Text>
            <TextInput
                style={styles.input}
                value={description}
                onChangeText={setDescription}
                placeholder="Enter a description"
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
            <DateTimePicker
                value={date}
                mode="date"
                display="inline"
                onChange={(event, selectedDate) => setDate(selectedDate || date)}
            />
            <Button title="Save" onPress={handleSave} />
        </ View>
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
  });

export default DietForm;
