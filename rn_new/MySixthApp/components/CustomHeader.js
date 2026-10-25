
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT_SIZES } from '../theme';

export default function CustomHeader({ title }) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.primary,
    padding: SPACING.large,
    alignItems: 'center',
  },
  title: {
    color: COLORS.white,
    fontSize: FONT_SIZES.large,
    fontWeight: 'bold',
  },
});
