import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ItemList from "../components/ItemList";
import CustomButton from "../components/CustomButton";
import colors from "../styles/colors";
import spacing from "../styles/spacing";
import typography from "../styles/typography";
import { database } from '../firebase/firebaseConfig';
import { collection, onSnapshot } from "firebase/firestore";

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(database, "activity"), (querySnapshot) => {
      if (!querySnapshot.empty) {
        const activityArray = [];
        querySnapshot.forEach((doc) => {
          activityArray.push({ ...doc.data(), id: doc.id });
        });
        setActivities(activityArray);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={styles.container}>
      <ItemList
        data={activities}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.activity} - {item.duration} min</Text>
          </View>
        )}
      />
      <CustomButton
        title="Add Activity"
        onPress={() => navigation.navigate('ActivityDetails')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.medium,
  },
  item: {
    padding: spacing.medium,
    backgroundColor: colors.primary,
    marginBottom: spacing.small,
    borderRadius: spacing.small,
  },
  itemText: {
    color: colors.textLight,
    fontSize: typography.body,
  },
});

export default Activities;
