import "../global.css";
import "expo-dev-client";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider as NavThemeProvider } from "@react-navigation/native";
import { useColorScheme, useInitialAndroidBarSync } from "~/lib/useColorScheme";
import { NAV_THEME } from "~/theme";
import { Slot } from "expo-router";
export { ErrorBoundary } from "expo-router";
import { PortalHost } from "@rn-primitives/portal";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "~/database/drizzle/migrations";
import { View, Text } from "react-native";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { db, studioDb } from "~/database/init-drizzle";

export default function RootLayout() {
  useInitialAndroidBarSync();
  useDrizzleStudio(studioDb);
  const { colorScheme, isDarkColorScheme } = useColorScheme();
  const { success, error } = useMigrations(db, migrations);

  if (error) {
    console.error(error.message);
  }

  if (!success) {
    return (
      <View>
        <Text> Migrations in progress...</Text>
      </View>
    );
  }

  return (
    <>
      <StatusBar
        key={`root-status-bar-${isDarkColorScheme ? "light" : "dark"}`}
        style={isDarkColorScheme ? "light" : "dark"}
      />
      <NavThemeProvider value={NAV_THEME[colorScheme]}>
        <Slot />
      </NavThemeProvider>
      <PortalHost />
    </>
  );
}
