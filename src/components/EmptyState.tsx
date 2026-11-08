import { StyleSheet, View } from "react-native";
import { Icon, Text, useTheme } from "react-native-paper";

import { spacing } from "@/constants/theme";

type EmptyStateProps = {
  icon: string;
  title: string;
  message: string;
};

// Shown when a request works but there are no results to display.
export default function EmptyState({ icon, title, message }: EmptyStateProps) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Icon source={icon} size={48} color={theme.colors.onSurfaceVariant} />
      <Text variant="titleMedium" style={styles.title}>
        {title}
      </Text>
      <Text variant="bodyMedium" style={[styles.message, { color: theme.colors.onSurfaceVariant }]}>
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.xl,
  },
  title: {
    marginTop: spacing.md,
  },
  message: {
    textAlign: "center",
    marginTop: spacing.xs,
  },
});
