import { StyleSheet, View } from "react-native";
import { Button, Icon, Text, useTheme } from "react-native-paper";

import { spacing } from "@/constants/theme";

type ErrorStateProps = {
  message: string;
  onRetry: () => void;
};

// Shown when an API request fails. Gives the user a button to try again.
export default function ErrorState({ message, onRetry }: ErrorStateProps) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Icon source="wifi-off" size={48} color={theme.colors.error} />
      <Text variant="titleMedium" style={styles.title}>
        Couldn&apos;t load data
      </Text>
      <Text variant="bodyMedium" style={[styles.message, { color: theme.colors.onSurfaceVariant }]}>
        {message}. Check your internet connection and try again.
      </Text>
      <Button mode="contained" icon="refresh" onPress={onRetry}>
        Try again
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.xl,
  },
  title: {
    marginTop: spacing.md,
  },
  message: {
    textAlign: "center",
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
});
