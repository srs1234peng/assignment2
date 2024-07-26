import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { spacing } from '../styles/styleHelper';

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
