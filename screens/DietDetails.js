import React from 'react';
import { View, StyleSheet } from 'react-native';
import DietForm from '../components/DietForm';
import colors from '../styles/colors';
import spacing from '../styles/spacing';
import { useNavigation, useRoute } from '@react-navigation/native';
import { writeToDB, updateDetails } from '../firebase/firestoreHelper';

const DietDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { initialData } = route.params || {};

  const handleSave = async (data) => {
    try {
      if (initialData?.id) {
        await updateDetails('diet', initialData.id, data);
      } else {
        await writeToDB(data, 'diet');
      }
      navigation.goBack();
    } catch (error) {
      console.error('Error saving diet entry:', error);
    }
  };

  return (
    <View style={styles.container}>
      <DietForm onSubmit={handleSave} initialData={initialData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.medium,
    backgroundColor: colors.background,
  },
});

export default DietDetails;
