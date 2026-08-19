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


// //Activity01--Welcome to the react native
// //Activity02--Login page

// //Assignment01--  Why we use react native? What is react native?
// //                Diff between react and react-native
// //                Real-time application of react-native.
//                   Where we use react-native in company level? 

//Activity01 -- Blank Page
// import React from 'react';
// import { View } from 'react-native';

// function App() {
//   return (
//     <View style={{ flex: 1 }} />  //Default view color is white
//   );
// }

// export default App;

//Activity02 -- Welcome msg
// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// function App() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>
//         👋 Welcome to Harshada's React Native App!
//       </Text>

//       <Text style={styles.subHeading}>
//         Let's build amazing mobile applications together.
//       </Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#FFFFFF',
//     padding: 20,
//   },
//   heading: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#1E3A8A',
//     textAlign: 'center',
//     marginBottom: 15,
//   },
//   subHeading: {
//     fontSize: 18,
//     color: '#555',
//     textAlign: 'center',
//   },
// });

// export default App;

//Activity03 -- Login Page
// import React from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
// } from 'react-native';

// function App() {
//   return (
//     <View style={styles.container}>

//       <Text style={styles.title}>Login Page!</Text>

//       <Text style={styles.label}>Email</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter your email"
//       />

//       <Text style={styles.label}>Password</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter your password"
//         secureTextEntry={true}
//       />

//       <TouchableOpacity style={styles.button}>
//         <Text style={styles.buttonText}>Login</Text>
//       </TouchableOpacity>

//       <Text style={styles.footer}>
//         Don't have an account? Sign Up
//       </Text>

//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 25,
//     backgroundColor: '#F5F5F5',
//   },

//   title: {
//     fontSize: 30,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 40,
//     color: '#1E3A8A',
//   },

//   label: {
//     fontSize: 16,
//     marginBottom: 5,
//     fontWeight: '600',
//   },

//   input: {
//     borderWidth: 1,
//     borderColor: '#999',
//     borderRadius: 8,
//     padding: 12,
//     marginBottom: 20,
//     backgroundColor: '#fff',
//   },

//   button: {
//     backgroundColor: '#1E88E5',
//     padding: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 10,
//   },

//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },

//   footer: {
//     textAlign: 'center',
//     marginTop: 25,
//     fontSize: 15,
//     color: '#555',
//   },
// });

// export default App;

//Activity04 & 05 -- Change colour and style of Welcome msg and background colour
// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// function App() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>
//         👋 Welcome to Harshada's React Native App!
//       </Text>

//       <Text style={styles.subHeading}>
//         Let's build amazing mobile applications together.
//       </Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#E3F2FD', // Light Blue Background
//     padding: 20,
//   },

//   heading: {
//     fontSize: 30,
//     fontWeight: 'bold',
//     color: '#1565C0',          // Blue Text
//     backgroundColor: '#BBDEFB', // Light Blue Box
//     padding: 15,
//     borderRadius: 12,
//     textAlign: 'center',
//     borderWidth: 2,
//     borderColor: '#0D47A1',
//     marginBottom: 20,
//   },

//   subHeading: {
//     fontSize: 18,
//     color: '#424242',
//     fontStyle: 'italic',
//     textAlign: 'center',
//   },
// });

// export default App;

//Activity06 -- Student ID Card
// import React from 'react';
// import { View, Text, Image, StyleSheet } from 'react-native';

// function App() {
//   return (
//     <View style={styles.container}>
//       <View style={styles.card}>

//         <Text style={styles.title}>Student ID Card</Text>

//         <Image
//           source={require('./images/myPhoto.jpeg')}
//           style={styles.image}
//         />

//         <View style={styles.row}>
//           <Text style={styles.label}>Name</Text>
//           <Text style={styles.value}>: Harshada Jivandhar Keste</Text>
//         </View>

//         <View style={styles.row}>
//           <Text style={styles.label}>PRN</Text>
//           <Text style={styles.value}>: 23UAM052</Text>
//         </View>

//         <View style={styles.row}>
//           <Text style={styles.label}>Department</Text>
//           <Text style={styles.value}>: CSE (AIML)</Text>
//         </View>

//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({

//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#ECECEC',
//   },

//   card: {
//     width: 330,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 15,
//     padding: 20,
//     elevation: 8,
//     alignItems: 'center',
//   },

//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#0D47A1',
//     marginBottom: 20,
//   },

//   image: {
//     width: 140,
//     height: 140,
//     borderRadius: 70,
//     marginBottom: 25,
//   },

//   row: {
//     flexDirection: 'row',
//     width: '100%',
//     marginBottom: 15,
//   },

//   label: {
//     width: 110,
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#212121',
//   },

//   value: {
//     flex: 1,
//     fontSize: 18,
//     color: '#424242',
//   },

// });

// export default App;

//Activity07 -- Counter App
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

function App() {

  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Counter App
      </Text>

      <Text style={styles.counter}>
        {count}
      </Text>

      <View style={styles.buttonContainer}>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setCount(count + 1)}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setCount(count - 1)}
        >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>

      </View>

      <TouchableOpacity
        style={styles.resetButton}
        onPress={() => setCount(0)}
      >
        <Text style={styles.resetText}>
          Reset
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1565C0',
    marginBottom: 30,
  },

  counter: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 40,
  },

  buttonContainer: {
    flexDirection: 'row',
    gap: 20,
  },

  button: {
    width: 70,
    height: 70,
    backgroundColor: '#2196F3',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: 'white',
    fontSize: 35,
    fontWeight: 'bold',
  },

  resetButton: {
    marginTop: 30,
    backgroundColor: '#E53935',
    paddingHorizontal: 35,
    paddingVertical: 12,
    borderRadius: 10,
  },

  resetText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },

});

export default App;