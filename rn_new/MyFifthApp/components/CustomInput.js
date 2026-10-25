import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function CustomInput({
  label,
  value,
  onChangeText,
  placeholder,
  error,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 6,
    padding: 10,
  },
  error: {
    color: 'red',
  },
});