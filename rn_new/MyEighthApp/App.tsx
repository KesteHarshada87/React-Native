
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

const STORAGE_KEY = 'todos';

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [task, setTask] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  // Read saved tasks when the app opens
  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);

      if (data !== null) {
        setTodos(JSON.parse(data));
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to load tasks');
    }
  };

  // Save tasks and update the screen
  const saveTodos = async (updatedTodos: Todo[]) => {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedTodos)
      );
      setTodos(updatedTodos);
    } catch (error) {
      Alert.alert('Error', 'Unable to save tasks');
    }
  };

  // Create or update a task
  const addOrUpdateTask = async () => {
    if (task.trim() === '') {
      Alert.alert('Please enter a task');
      return;
    }

    if (editingId !== null) {
      const updatedTodos = todos.map(item =>
        item.id === editingId
          ? { ...item, title: task.trim() }
          : item
      );

      await saveTodos(updatedTodos);
      setEditingId(null);
    } else {
      const newTodo: Todo = {
        id: Date.now().toString(),
        title: task.trim(),
        completed: false,
      };

      await saveTodos([...todos, newTodo]);
    }

    setTask('');
  };

  // Select a task for editing
  const editTask = (item: Todo) => {
    setTask(item.title);
    setEditingId(item.id);
  };

  // Delete a task
  const deleteTask = (id: string) => {
    Alert.alert('Delete Task', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          const updatedTodos = todos.filter(
            item => item.id !== id
          );
          await saveTodos(updatedTodos);
        },
      },
    ]);
  };

  // Mark a task as completed or incomplete
  const toggleTask = async (id: string) => {
    const updatedTodos = todos.map(item =>
      item.id === id
        ? { ...item, completed: !item.completed }
        : item
    );

    await saveTodos(updatedTodos);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Eighth App</Text>
      <Text style={styles.subtitle}>Notes / To-Do List</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your task"
        value={task}
        onChangeText={setTask}
      />

      <Pressable
        style={styles.addButton}
        onPress={addOrUpdateTask}
      >
        <Text style={styles.buttonText}>
          {editingId !== null ? 'Update Task' : 'Add Task'}
        </Text>
      </Pressable>

      <Text style={styles.listHeading}>My Tasks</Text>

      <FlatList
        data={todos}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No tasks added yet.</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Pressable
              style={styles.taskTextContainer}
              onPress={() => toggleTask(item.id)}
            >
              <Text
                style={[
                  styles.taskText,
                  item.completed && styles.completed,
                ]}
              >
                {item.completed ? '✓ ' : ''}
                {item.title}
              </Text>
            </Pressable>

            <Pressable
              style={styles.editButton}
              onPress={() => editTask(item)}
            >
              <Text style={styles.buttonText}>Edit</Text>
            </Pressable>

            <Pressable
              style={styles.deleteButton}
              onPress={() => deleteTask(item.id)}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 55,
    backgroundColor: '#F4F6F9',
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#222',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 20,
    color: '#555',
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#2563EB',
    padding: 13,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  listHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 12,
  },
  emptyText: {
    textAlign: 'center',
    color: '#777',
    marginTop: 20,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    gap: 8,
  },
  taskTextContainer: {
    flex: 1,
  },
  taskText: {
    fontSize: 15,
    color: '#222',
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  editButton: {
    backgroundColor: '#16A34A',
    padding: 9,
    borderRadius: 6,
  },
  deleteButton: {
    backgroundColor: '#DC2626',
    padding: 9,
    borderRadius: 6,
  },
});
