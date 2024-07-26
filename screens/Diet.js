import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ItemList from '../components/ItemList';
import CustomButton from '../components/CustomButton';
import colors from '../styles/colors';
import spacing from '../styles/spacing';
import typography from '../styles/typography';
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
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.description} - {item.calories} calories</Text>
          </View>
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

export default Diet;
