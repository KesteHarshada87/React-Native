
import React, { useState } from 'react';
import { View, Alert, StyleSheet } from 'react-native';

import CustomHeader from '../components/CustomHeader';
import CustomCard from '../components/CustomCard';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { COLORS, SPACING } from '../theme';

export default function ProfileScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <View style={styles.container}>
      <CustomHeader title="My Profile" />

      <View style={styles.content}>
        <CustomCard>
          <CustomInput
            label="Name"
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
          />

          <CustomInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
          />

          <CustomButton
            title="Save Profile"
            onPress={() =>
              Alert.alert('Success', 'Profile saved successfully!')
            }
          />
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
});
