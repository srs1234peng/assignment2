import React from 'react';
import { View, StyleSheet } from 'react-native';
import ActivityForm from '../components/ActivityForm';
import colors from '../styles/colors';
import spacing from '../styles/spacing';
import { useNavigation, useRoute } from '@react-navigation/native';
import { writeToDB, updateDetails } from '../firebase/firestoreHelper'; 

const ActivityDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { initialData } = route.params || {};

  const handleSave = async (data) => {
    try {
      if (initialData?.id) {
        await updateDetails(initialData.id, 'activities', data);
      } else {
        await writeToDB(data, 'activities');
      }
      navigation.goBack();
    } catch (error) {
      console.error("Error saving activity: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <ActivityForm onSubmit={handleSave} initialData={initialData} />
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

export default ActivityDetails;
