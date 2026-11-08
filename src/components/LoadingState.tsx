import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";

import { spacing } from "@/constants/theme";

type LoadingStateProps = {
  message?: string;
};

// Spinner with a short message that is shown while data is loading.
export default function LoadingState({ message = "Loading..." }: LoadingStateProps) {
  return (
    <View style={styles.container} accessibilityRole="progressbar" accessibilityLabel={message}>
      <ActivityIndicator size="large" />
      <Text variant="bodyLarge" style={styles.message}>
        {message}
      </Text>
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
  message: {
    marginTop: spacing.md,
    opacity: 0.8,
  },
});
