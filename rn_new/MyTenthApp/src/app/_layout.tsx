
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Login" }} />
      <Stack.Screen name="register" options={{ title: "Sign Up" }} />
      <Stack.Screen
        name="forgot-password"
        options={{ title: "Forgot Password" }}
      />
      <Stack.Screen name="home" options={{ title: "Home" }} />
    </Stack>
  );
}
