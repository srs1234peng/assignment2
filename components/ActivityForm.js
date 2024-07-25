import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Button from "./components/Button";
import { colors, spacing, typography } from "./styles";

const ActivityForm = ({onSubmit, initializeData = {}}) => {
    const [activity, setActivity] = useState(initializeData.activity || "");
    const [date, setDate] = useState(initializeData.date || new Date());
    const [duration, setDuration] = useState(initializeData.duration || 0);

    const handleSave = () => {
        if (!activity || !date || !duration) {
            return;
        }
        onSubmit({ activity, date, duration });
    };

    return (
        <View>
            <Text style={styles.label}>Activity</Text>
            <TextInput
                style={styles.input}
                value={activity}
                onChangeText={setActivity}
            />
            <Text style={styles.label}>Date</Text>
            <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                    const currentDate = selectedDate || date;
                    setDate(currentDate);
                }}
            />
            <Text style={styles.label}>Duration</Text>
            <TextInput
                style={styles.input}
                value={duration}
                onChangeText={setDuration}
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

export default ActivityForm;
