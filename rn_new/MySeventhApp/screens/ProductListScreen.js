
import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';

import { CartContext } from '../context/CartContext';

const products = [
  { id: '1', name: 'Laptop', price: 50000 },
  { id: '2', name: 'Headphones', price: 2000 },
  { id: '3', name: 'Mobile Phone', price: 15000 },
  { id: '4', name: 'Keyboard', price: 1000 },
];

export default function ProductListScreen() {
  const [loading, setLoading] = useState(true);
  const [productList, setProductList] = useState([]);

  const { addItem } = useContext(CartContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProductList(products);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text>Loading products...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Product List</Text>

      {productList.map((product) => (
        <View key={product.id} style={styles.card}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>
            Price: ₹{product.price.toLocaleString('en-IN')}
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              addItem(product);
              Alert.alert('Success', `${product.name} added to cart`);
            }}
          >
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    padding: 15,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#1E293B',
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 12,
    borderRadius: 10,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  price: {
    fontSize: 16,
    marginVertical: 8,
    color: '#475569',
  },
  button: {
    backgroundColor: '#2563EB',
    padding: 12,
    borderRadius: 7,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
