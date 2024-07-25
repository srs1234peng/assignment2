import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ItemList from '../components/ItemList';
import CustomButton from '../components/CustomButton';
import colors from '../styles/colors';
import spacing from '../styles/spacing';
import typography from '../styles/typography';
import { firestore } from '../firebase/firebaseConfig';

const Diet = () => {
  const [dietEntries, setDietEntries] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchDietEntries = async () => {
      const dietCollection = await firestore.collection('diet').get();
      setDietEntries(dietCollection.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchDietEntries();
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
