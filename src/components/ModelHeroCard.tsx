import { StyleSheet, View } from "react-native";
import { Card, Icon, Text, useTheme } from "react-native-paper";

import { spacing } from "@/constants/theme";

type ModelHeroCardProps = {
  modelName: string;
  makeName: string;
  icon: string;
};

// Big card at the top of the model details screen with the model's name.
export default function ModelHeroCard({ modelName, makeName, icon }: ModelHeroCardProps) {
  const theme = useTheme();

  return (
    <Card mode="contained" style={[styles.card, { backgroundColor: theme.colors.primaryContainer }]}>
      <Card.Content style={styles.content}>
        <View style={[styles.iconCircle, { backgroundColor: theme.colors.primary }]}>
          <Icon source={icon} size={40} color={theme.colors.onPrimary} />
        </View>
        <Text variant="labelLarge" style={{ color: theme.colors.onPrimaryContainer }}>
          {makeName}
        </Text>
        <Text
          variant="displaySmall"
          style={[styles.modelName, { color: theme.colors.onPrimaryContainer }]}
        >
          {modelName}
        </Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: spacing.md,
    marginTop: spacing.sm,
  },
  content: {
    alignItems: "center",
    paddingVertical: spacing.lg,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
  },
  modelName: {
    textAlign: "center",
    marginTop: spacing.xs,
  },
});
