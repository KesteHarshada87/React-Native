
import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';

import CustomHeader from '../components/CustomHeader';
import CustomCard from '../components/CustomCard';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { COLORS, SPACING, FONT_SIZES } from '../theme';

export default function SettingsScreen() {
  const [username, setUsername] = useState('');
  const [city, setCity] = useState('');

  return (
    <View style={styles.container}>
      <CustomHeader title="Settings" />

      <View style={styles.content}>
        <CustomCard>
          <Text style={styles.heading}>Account Settings</Text>

          <CustomInput
            label="Username"
            value={username}
            onChangeText={setUsername}
            placeholder="Enter username"
          />

          <CustomInput
            label="City"
            value={city}
            onChangeText={setCity}
            placeholder="Enter city"
          />

          <CustomButton
            title="Save Settings"
            onPress={() =>
              Alert.alert('Success', 'Settings saved successfully!')
            }
          />
        </CustomCard>

        <CustomCard>
          <Text style={styles.heading}>Appearance</Text>
          <Text style={styles.description}>
            Consistent theme across the application.
          </Text>
        </CustomCard>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.medium,
  },
  heading: {
    fontSize: FONT_SIZES.large,
    color: COLORS.text,
    fontWeight: 'bold',
    marginBottom: SPACING.small,
  },
  description: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.gray,
  },
});
