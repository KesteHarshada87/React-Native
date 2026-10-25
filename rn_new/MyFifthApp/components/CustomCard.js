import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function CustomCard({ children }) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 15,
    margin: 15,
    borderRadius: 10,
    elevation: 4,
  },
});