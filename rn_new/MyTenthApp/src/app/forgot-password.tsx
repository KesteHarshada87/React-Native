
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Platform,
} from "react-native";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { Link } from "expo-router";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const showMessage = (title: string, message: string) => {
    if (Platform.OS === "web") {
      window.alert(`${title}\n\n${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  const resetPassword = async () => {
    console.log("Send Reset Email button clicked");

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      showMessage("Error", "Please enter your email address.");
      return;
    }

    setLoading(true);

    try {
      console.log("Sending password reset request...");

      await sendPasswordResetEmail(auth, trimmedEmail);

      showMessage(
        "Success",
        "Password reset email sent. Check your inbox and spam folder."
      );
    } catch (error: any) {
      console.error("Password reset error:", error.code, error.message);

      showMessage(
        "Password Reset Error",
        `${error.code ?? "Unknown error"}\n${error.message ?? "Please try again."}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <Button
        title={loading ? "Sending..." : "Send Reset Email"}
        onPress={resetPassword}
        disabled={loading}
      />

      <Link href="/" style={styles.link}>
        Back to Login
      </Link>
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
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 8,
    padding: 14,
    marginBottom: 18,
  },
  link: {
    textAlign: "center",
    marginTop: 20,
    color: "#1769e0",
  },
});
