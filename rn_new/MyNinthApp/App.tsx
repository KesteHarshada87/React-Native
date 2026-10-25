
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import axios from 'axios';

type Post = {
  id: number;
  title: string;
  body: string;
};

const API_URL =
  'https://jsonplaceholder.typicode.com/posts?_limit=10';

export default function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [method, setMethod] = useState('Fetch API');

  // Fetch API
  const loadWithFetch = async () => {
    setLoading(true);
    setError('');
    setMethod('Fetch API');

    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error('Request failed');
      }

      const data = await response.json();
      setPosts(data);
    } catch (e) {
      setError('Unable to load data. Check your internet.');
    } finally {
      setLoading(false);
    }
  };

  // Axios
  const loadWithAxios = async () => {
    setLoading(true);
    setError('');
    setMethod('Axios');

    try {
      const response = await axios.get<Post[]>(API_URL);
      setPosts(response.data);
    } catch (e) {
      setError('Unable to load data. Check your internet.');
    } finally {
      setLoading(false);
    }
  };

  // Load data when the app opens
  useEffect(() => {
    loadWithFetch();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>My Ninth App</Text>
      <Text style={styles.subtitle}>
        REST API - Fetch API and Axios
      </Text>

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.button}
          onPress={loadWithFetch}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Fetch API</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={loadWithAxios}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Axios</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.info}>
        Selected Method: {method}
      </Text>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#2563EB" />
          <Text>Loading posts...</Text>
        </View>
      ) : error !== '' ? (
        <View style={styles.center}>
          <Text style={styles.error}>{error}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={
              method === 'Axios' ? loadWithAxios : loadWithFetch
            }
          >
            <Text style={styles.buttonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.postId}>
                Post ID: {item.id}
              </Text>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.body}>{item.body}</Text>
            </View>
          )}
          ListEmptyComponent={
            <Text>No posts available.</Text>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F1F5F9',
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1E293B',
  },
  subtitle: {
    textAlign: 'center',
    marginVertical: 10,
    color: '#64748B',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginVertical: 12,
  },
  button: {
    backgroundColor: '#2563EB',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  info: {
    textAlign: 'center',
    marginBottom: 12,
    color: '#334155',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginBottom: 12,
    borderRadius: 10,
    elevation: 2,
  },
  postId: {
    color: '#2563EB',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 6,
  },
  body: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
  },
});
