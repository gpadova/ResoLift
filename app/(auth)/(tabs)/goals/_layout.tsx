import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { Stack, useRouter } from "expo-router";
import { COLORS } from "~/theme/colors";

export default function GoalsLayout() {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="[goalId]"
        options={{
          headerShown: true,
          headerLeft: () => {
            return (
              <Pressable onPress={() => router.back()} className="p-2">
                <Ionicons
                  name="arrow-back"
                  size={24}
                  color={COLORS.light.primary}
                />
              </Pressable>
            );
          },
          title: "",
        }}
      />
    </Stack>
  );
}
