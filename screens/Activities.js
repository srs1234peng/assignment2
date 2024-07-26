import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
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

  const renderItem = ({ item }) => {
    console.log(item); // Log item data to verify its structure
    const date = item.date ? new Date(item.date.seconds * 1000) : null;

    return (
      <Pressable key={item.id} onPress={() => navigation.navigate('ActivityDetails', { initialData: item })}>
        <View style={styles.item}>
          <View style={styles.itemRow}>
            <Text style={styles.itemText}>{item.activity}</Text>
            {item.special && (
              <MaterialIcons name="warning" size={20} color="yellow" style={styles.icon} />
            )}
          </View>
          <Text style={styles.itemText}>{date ? date.toDateString() : 'Invalid Date'}</Text>
          <Text style={styles.itemText}>{item.duration}</Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <ItemList
        data={activities}
        renderItem={renderItem}
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
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemText: {
    color: colors.textLight,
    fontSize: typography.body,
  },
  icon: {
    marginLeft: 10,
  },
});

export default Activities;
