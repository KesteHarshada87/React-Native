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

//Activity01 -- Welcome UI
// import React from 'react';
// import { View, Text, Button, StyleSheet } from 'react-native';

// const App = () => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Welcome</Text>

//       <Text style={styles.name}>My Name is Harshada</Text>

//       <Button
//         title="Click Me"
//         onPress={() => alert("Button Clicked")}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',   // Center vertically
//     alignItems: 'center',       // Center horizontally
//     backgroundColor: '#ffffff',
//   },

//   heading: {
//     fontSize: 30,
//     fontWeight: 'bold',
//     marginBottom: 15,
//   },

//   name: {
//     fontSize: 20,
//     marginBottom: 20,
//   },
// });

// export default App;

//Activity02 -- flexbox(row, column)
// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// const App = () => {
//   return (
//     <View style={styles.container}>

//       <Text style={styles.heading}>Flex Direction Row</Text>

//       <View style={styles.rowContainer}>
//         <View style={styles.box}>
//           <Text>1</Text>
//         </View>

//         <View style={styles.box}>
//           <Text>2</Text>
//         </View>

//         <View style={styles.box}>
//           <Text>3</Text>
//         </View>
//       </View>


//       <Text style={styles.heading}>Flex Direction Column</Text>

//       <View style={styles.columnContainer}>
//         <View style={styles.box}>
//           <Text>1</Text>
//         </View>

//         <View style={styles.box}>
//           <Text>2</Text>
//         </View>

//         <View style={styles.box}>
//           <Text>3</Text>
//         </View>
//       </View>

//     </View>
//   );
// };


// const styles = StyleSheet.create({

//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//   heading: {
//     fontSize: 20,
//     margin: 10,
//   },

//   rowContainer: {
//     flexDirection: 'row',
//   },

//   columnContainer: {
//     flexDirection: 'column',
//   },

//   box: {
//     width: 60,
//     height: 60,
//     backgroundColor: 'skyblue',
//     margin: 5,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

// });

// export default App;

//Activity03 -- justifyContent and alignItems
// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// const App = () => {
//   return (
//     <View style={styles.container}>

//       <Text style={styles.title}>
//         justifyContent & alignItems Example
//       </Text>

//       <View style={styles.box}>
//         <Text>1</Text>
//       </View>

//       <View style={styles.box}>
//         <Text>2</Text>
//       </View>

//       <View style={styles.box}>
//         <Text>3</Text>
//       </View>

//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center', // Vertical alignment
//     alignItems: 'center',     // Horizontal alignment
//   },

//   title: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },

//   box: {
//     width: 70,
//     height: 70,
//     backgroundColor: 'skyblue',
//     margin: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default App;

//Activity04 -- ScrollView(100 products)
// import React from 'react';
// import { ScrollView, View, Text, StyleSheet } from 'react-native';

// const App = () => {
//   const products = [];

//   // Create 100 products
//   for (let i = 1; i <= 100; i++) {
//     products.push(`Product ${i}`);
//   }

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.title}>Product List</Text>

//       {products.map((item, index) => (
//         <View key={index} style={styles.card}>
//           <Text style={styles.productText}>{item}</Text>
//         </View>
//       ))}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     padding: 10,
//   },

//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 15,
//   },

//   card: {
//     backgroundColor: 'skyblue',
//     padding: 15,
//     marginBottom: 10,
//     borderRadius: 8,
//   },

//   productText: {
//     fontSize: 18,
//   },
// });

// export default App;

//Activity05 -- flatlist
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const App = () => {

  const products = [];

  for (let i = 1; i <= 100; i++) {
    products.push({
      id: i.toString(),
      name: `Product ${i}`,
      price: `₹${i * 100}`
    });
  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>FlatList Example</Text>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}

        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>{item.price}</Text>
          </View>
        )}
      />

    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 10,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },

  card: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 4,
  },

  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  price: {
    fontSize: 16,
    color: 'green',
    marginTop: 5,
  },

});

export default App;