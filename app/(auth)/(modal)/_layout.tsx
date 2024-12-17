import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { router, Stack } from "expo-router";
import { TouchableOpacity } from "react-native";
import { NAV_THEME } from "~/theme";
import { COLORS } from "~/theme/colors";

export default function AuthModalLayout() {
  const { colors } = useTheme();
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="add-goal"
        options={{
          presentation: "modal",
          headerTitle: "New Goal",
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="close" size={24} color={colors.text} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
}
