
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT_SIZES, RADIUS } from '../theme';

export default function CustomInput({
  label,
  value,
  onChangeText,
  placeholder,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.gray}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.small,
  },
  label: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.text,
    marginBottom: SPACING.small,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: RADIUS.small,
    padding: SPACING.small,
    color: COLORS.text,
  },
});
