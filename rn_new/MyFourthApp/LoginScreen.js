import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert
} from 'react-native';

export default function LoginScreen({ goToRegister }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateLogin = () => {
    let valid = true;

    setEmailError('');
    setPasswordError('');

    // Check email
    if (email === '') {
      setEmailError('Enter email');
      valid = false;
    } else if (!email.includes('@')) {
      setEmailError('Enter a valid email');
      valid = false;
    }

    // Check password
    if (password === '') {
      setPasswordError('Enter password');
      valid = false;
    }

    if (valid) {
      Alert.alert('Success', 'Login Successful!');
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      {emailError !== '' && (
        <Text style={styles.error}>{emailError}</Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      {passwordError !== '' && (
        <Text style={styles.error}>{passwordError}</Text>
      )}

      <Button
        title="Login"
        onPress={validateLogin}
      />

      <Text
        style={styles.link}
        onPress={goToRegister}
      >
        Don't have an account? Register
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    justifyContent: 'center',
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },

  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 12,
    marginTop: 10,
    borderRadius: 5,
  },

  error: {
    color: 'red',
    marginBottom: 5,
  },

  link: {
    color: 'blue',
    textAlign: 'center',
    marginTop: 20,
  },
});