import React from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../styles';

const ItemsList = ({ data, renderItem }) => {
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.medium,
  },
});

export default ItemsList;
