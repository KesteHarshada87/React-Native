
import React, { useContext, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

import { CartContext } from '../context/CartContext';

export default function CartScreen() {
  const { cartItems, removeItem } = useContext(CartContext);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price,
    0
  );

  useEffect(() => {
    console.log('Cart updated. Total price:', total);
  }, [cartItems, total]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>My Cart</Text>

      {cartItems.length === 0 ? (
        <Text style={styles.empty}>Your cart is empty.</Text>
      ) : (
        cartItems.map((item) => (
          <View key={item.cartId} style={styles.card}>
            <View style={styles.details}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>
                ₹{item.price.toLocaleString('en-IN')}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeItem(item.cartId)}
            >
              <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))
      )}

      <View style={styles.totalCard}>
        <Text style={styles.totalText}>
          Total: ₹{total.toLocaleString('en-IN')}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    padding: 15,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#1E293B',
  },
  empty: {
    fontSize: 16,
    color: '#64748B',
    marginVertical: 20,
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  price: {
    fontSize: 15,
    marginTop: 5,
    color: '#475569',
  },
  removeButton: {
    backgroundColor: '#DC2626',
    padding: 9,
    borderRadius: 6,
  },
  removeText: {
    color: 'white',
    fontWeight: 'bold',
  },
  totalCard: {
    backgroundColor: 'white',
    padding: 18,
    marginTop: 10,
    borderRadius: 10,
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2563EB',
  },
});
