import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CustomHeader({ title }) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'blue',
    padding: 18,
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
});