
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT_SIZES, RADIUS } from '../theme';

export default function CustomButton({
  title,
  onPress,
  color = COLORS.primary,
}) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: SPACING.medium,
    borderRadius: RADIUS.medium,
    marginVertical: SPACING.small,
  },
  text: {
    color: COLORS.white,
    textAlign: 'center',
    fontSize: FONT_SIZES.medium,
    fontWeight: 'bold',
  },
});
