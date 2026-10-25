// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */

// import { NewAppScreen } from '@react-native/new-app-screen';
// import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
// import {
//   SafeAreaProvider,
//   useSafeAreaInsets,
// } from 'react-native-safe-area-context';

// function App() {
//   const isDarkMode = useColorScheme() === 'dark';

//   return (
//     <SafeAreaProvider>
//       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
//       <AppContent />
//     </SafeAreaProvider>
//   );
// }

// function AppContent() {
//   const safeAreaInsets = useSafeAreaInsets();

//   return (
//     <View style={styles.container}>
//       <NewAppScreen
//         templateFileName="App.tsx"
//         safeAreaInsets={safeAreaInsets}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

// export default App;

import React, { useState } from 'react';
import { View, Alert, StyleSheet } from 'react-native';

import CustomButton from './components/CustomButton';
import CustomCard from './components/CustomCard';
import CustomHeader from './components/CustomHeader';
import CustomInput from './components/CustomInput';

export default function App() {
  const [name, setName] = useState('');

  return (
    <View style={styles.container}>
      <CustomHeader title="My Fifth App" />

      <CustomCard>
        <CustomInput
          label="Enter Your Name"
          value={name}
          onChangeText={setName}
          placeholder="Enter name"
        />

        <CustomButton
          title="Submit"
          color="blue"
          onPress={() =>
            Alert.alert('Welcome', `Hello ${name || 'User'}!`)
          }
        />

        <CustomButton
          title="Clear"
          color="red"
          onPress={() => setName('')}
        />
      </CustomCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
});
