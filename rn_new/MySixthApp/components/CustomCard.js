
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS, SPACING, RADIUS } from '../theme';

export default function CustomCard({ children }) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    padding: SPACING.medium,
    marginBottom: SPACING.medium,
    borderRadius: RADIUS.medium,
    elevation: 3,
  },
});
