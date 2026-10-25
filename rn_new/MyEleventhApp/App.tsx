
import React, {useState} from 'react';

import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  Alert,
  ScrollView,
  PermissionsAndroid,
  Platform,
} from 'react-native';

import {
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

import Geolocation from 'react-native-geolocation-service';

const App = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);

  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [message, setMessage] = useState('');

  // Open Camera
  const openCamera = async () => {
    try {
      const result = await launchCamera({
        mediaType: 'photo',
        cameraType: 'back',
        quality: 0.8,
      });

      if (result.didCancel) {
        return;
      }

      if (result.errorCode) {
        Alert.alert(
          'Camera Error',
          result.errorMessage || result.errorCode,
        );
        return;
      }

      const uri = result.assets?.[0]?.uri;

      if (uri) {
        setImageUri(uri);
      }
    } catch {
      Alert.alert('Error', 'Unable to open camera.');
    }
  };

  // Choose Image from Gallery
  const openGallery = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 1,
        quality: 0.8,
      });

      if (result.didCancel) {
        return;
      }

      if (result.errorCode) {
        Alert.alert(
          'Gallery Error',
          result.errorMessage || result.errorCode,
        );
        return;
      }

      const uri = result.assets?.[0]?.uri;

      if (uri) {
        setImageUri(uri);
      }
    } catch {
      Alert.alert('Error', 'Unable to select image.');
    }
  };

  // Get Current Location
  const getCurrentLocation = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          setMessage('Location permission denied.');
          return;
        }
      }

      setMessage('Getting current location...');

      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;

          setLocation({latitude, longitude});
          setMessage('Location retrieved successfully.');
        },
        error => {
          setMessage('Unable to get location: ' + error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        },
      );
    } catch {
      setMessage('Error while requesting location.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>MyEleventhApp</Text>

      <View style={styles.button}>
        <Button title="Open Camera" onPress={openCamera} />
      </View>

      <View style={styles.button}>
        <Button
          title="Choose from Gallery"
          onPress={openGallery}
        />
      </View>

      {imageUri ? (
        <Image source={{uri: imageUri}} style={styles.image} />
      ) : (
        <Text style={styles.message}>
          No image selected yet.
        </Text>
      )}

      <View style={styles.button}>
        <Button
          title="Get Current Location"
          onPress={getCurrentLocation}
        />
      </View>

      <Text style={styles.message}>{message}</Text>

      {location && (
        <View style={styles.location}>
          <Text>
            Latitude: {location.latitude.toFixed(6)}
          </Text>

          <Text>
            Longitude: {location.longitude.toFixed(6)}
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F7FA',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#1F2937',
  },
  button: {
    width: '100%',
    marginBottom: 16,
  },
  image: {
    width: 250,
    height: 250,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 12,
  },
  message: {
    marginTop: 12,
    marginBottom: 16,
    color: '#555555',
  },
  location: {
    marginTop: 12,
    alignItems: 'center',
  },
});

export default App;
