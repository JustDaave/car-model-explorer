import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import { PaperProvider } from "react-native-paper";

import { darkTheme, lightTheme } from "@/constants/theme";

export default function RootLayout() {
  // Follow the phone's light / dark mode setting
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;

  return (
    <PaperProvider theme={theme}>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      {/* Each screen draws its own M3 top app bar, so the default header is hidden */}
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.colors.background },
        }}
      />
    </PaperProvider>
  );
}
