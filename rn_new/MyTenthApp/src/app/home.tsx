
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { router } from "expo-router";

export default function HomeScreen() {
  const logout = async () => {
    try {
      await signOut(auth);
      router.replace("/");
    } catch {
      Alert.alert("Error", "Unable to log out. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.email}>
        Logged in as: {auth.currentUser?.email}
      </Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  email: {
    textAlign: "center",
    marginBottom: 24,
    fontSize: 16,
  },
});
