import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ItemList from "../components/ItemList";
import CustomButton from "../components/CustomButton";
import colors from "../styles/colors";
import spacing from "../styles/spacing";
import typography from "../styles/typography";
import { firestore } from "../firebase/firebaseConfig";

const Activities = () => {
    const [activities, setActivities] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchActivities = async () => {
            const activitiesCollection = await firestore.collection('activities').get();
            setActivities(activitiesCollection.docs.map(doc => ({ id: doc.id, ...doc.data() })));
          };
      
          fetchActivities();
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
