import { Ionicons } from "@expo/vector-icons";
import { router, Slot, Stack } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import { Text } from "~/components/nativewindui/Text";
export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(modal)" options={{ presentation: "modal" }} />
    </Stack>
  );
}
