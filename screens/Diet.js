import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import ItemList from '../components/ItemList';
import CustomButton from '../components/CustomButton';
import { colors, spacing, typography } from '../styles/styleHelper';
import { database } from '../firebase/firebaseConfig';
import { collection, onSnapshot } from "firebase/firestore";

const Diet = () => {
  const [dietEntries, setDietEntries] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(database, "diet"), (querySnapshot) => {
      if (!querySnapshot.empty) {
        const dietArray = [];
        querySnapshot.forEach((doc) => {
          dietArray.push({ ...doc.data(), id: doc.id });
        });
        setDietEntries(dietArray);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={styles.container}>
      <ItemList
        data={dietEntries}
        renderItem={({ item }) => (
          <Pressable key={item.id} onPress={() => navigation.navigate('DietDetails', { initialData: item })}>
            <View style={styles.item}>
              <View style={styles.itemRow}>
                <Text style={styles.itemText}>{item.description}</Text>
                {item.special && (
                  <MaterialIcons name="warning" size={20} color="yellow" style={styles.icon} />
                )}
              </View>
              <Text style={styles.itemDate}>{new Date(item.date.seconds * 1000).toDateString()}</Text>
              <Text style={styles.itemCalories}>{item.calories}</Text>
            </View>
          </Pressable>
        )}
      />
      <CustomButton
        title="Add Diet Entry"
        onPress={() => navigation.navigate('DietDetails')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.medium,
    backgroundColor: colors.background,
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
    marginLeft: spacing.small,
  },
  itemDate: {
    color: colors.textLight,
    fontSize: typography.body,
    marginTop: spacing.small,
  },
  itemCalories: {
    color: colors.textLight,
    fontSize: typography.body,
    marginTop: spacing.small,
  },
});

export default Diet;
