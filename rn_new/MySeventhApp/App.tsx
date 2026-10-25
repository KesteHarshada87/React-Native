
import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { CartProvider, CartContext } from './context/CartContext';
import ProductListScreen from './screens/ProductListScreen';
import CartScreen from './screens/CartScreen';

function MainScreen() {
  const [screen, setScreen] = useState('Products');
  const { cartItems } = useContext(CartContext);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      <View style={styles.tabs}>
        <Pressable
          onPress={() => setScreen('Products')}
          style={styles.tab}
          android_ripple={{ color: '#DBEAFE' }}
        >
          <Text
            style={[
              styles.tabText,
              screen === 'Products' && styles.activeText,
            ]}
          >
            Products
          </Text>
          {screen === 'Products' && <View style={styles.underline} />}
        </Pressable>

        <Pressable
          onPress={() => setScreen('Cart')}
          style={styles.tab}
          android_ripple={{ color: '#DBEAFE' }}
        >
          <Text
            style={[
              styles.tabText,
              screen === 'Cart' && styles.activeText,
            ]}
          >
            Cart ({cartItems.length})
          </Text>
          {screen === 'Cart' && <View style={styles.underline} />}
        </Pressable>
      </View>

      <View style={styles.content}>
        {screen === 'Products' ? <ProductListScreen /> : <CartScreen />}
      </View>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <CartProvider>
        <MainScreen />
      </CartProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F5F9',
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    elevation: 4,
    zIndex: 10,
  },
  tab: {
    flex: 1,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    color: '#64748B',
    fontSize: 17,
    fontWeight: 'bold',
  },
  activeText: {
    color: '#2563EB',
  },
  underline: {
    position: 'absolute',
    bottom: 0,
    height: 3,
    width: '55%',
    backgroundColor: '#2563EB',
  },
  content: {
    flex: 1,
  },
});
