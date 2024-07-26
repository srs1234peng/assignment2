import React from 'react';
import { View, StyleSheet } from 'react-native';
import ActivityForm from '../components/ActivityForm';
import colors from '../styles/colors';
import spacing from '../styles/spacing';
import { database } from '../firebase/firebaseConfig';
import { useNavigation, useRoute } from '@react-navigation/native';
import { updateDetails } from "../firebase/firestoreHelper";
import { update } from 'firebase/database';

const ActivityDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { initialData } = route.params || {};

  const handleSave = async (data) => {
    if (initialData?.id) {
      await updateDetails('activities', initialData.id, data);
    } else {
      await updateDetails('activities', data);
    }
    navigation(goBack);
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
