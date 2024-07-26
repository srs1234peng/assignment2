import React from 'react';
import { View, StyleSheet, Alert, Pressable } from 'react-native';
import ActivityForm from '../components/ActivityForm';
import colors from '../styles/colors';
import spacing from '../styles/spacing';
import { useNavigation, useRoute } from '@react-navigation/native';
import { updateDetails, writeToDB, deleteFromDB } from '../firebase/firestoreHelper';
import { MaterialIcons } from '@expo/vector-icons';

const ActivityDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { initialData } = route.params || {};

  const handleSave = async (data) => {
    
    try {
      // Automatically mark as special if calories > 800
      if (data.duration > 60) {
        data.special = true;
      } else {
        data.special = false;
      }
      if (initialData?.id) {
        await updateDetails(initialData.id, 'activity', data);
      } else {
        await writeToDB(data, 'activity');
      }
      navigation.goBack();
    } catch (error) {
      console.error('Error saving activity entry:', error);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete',
      'Are you sure you want to delete this item?',
      [
        { text: 'No', onPress: () => {}, style: 'cancel' },
        {
          text: 'Yes',
          onPress: async () => {
            try {
              await deleteFromDB(initialData.id, 'activity');
              navigation.goBack();
            } catch (error) {
              console.error('Error deleting activity entry:', error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      {initialData && (
        <Pressable onPress={handleDelete} style={styles.deleteButton}>
          <MaterialIcons name="delete" size={24} color={colors.primary} />
        </Pressable>
      )}
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
  deleteButton: {
    position: 'absolute',
    top: spacing.medium,
    right: spacing.medium,
  },
});

export default ActivityDetails;
