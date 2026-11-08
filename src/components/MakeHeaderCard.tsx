import { StyleSheet, View } from "react-native";
import { Card, Text, useTheme } from "react-native-paper";

import MakeAvatar from "@/components/MakeAvatar";
import { spacing } from "@/constants/theme";

type MakeHeaderCardProps = {
  makeName: string;
  makeId: number;
};

// Card at the top of the make screen that shows which brand you're looking at.
export default function MakeHeaderCard({ makeName, makeId }: MakeHeaderCardProps) {
  const theme = useTheme();

  return (
    <Card mode="contained" style={[styles.card, { backgroundColor: theme.colors.primaryContainer }]}>
      <Card.Content style={styles.content}>
        <MakeAvatar makeName={makeName} size={56} />
        <View style={styles.text}>
          <Text variant="headlineSmall" style={{ color: theme.colors.onPrimaryContainer }}>
            {makeName}
          </Text>
          <Text variant="bodyMedium" style={{ color: theme.colors.onPrimaryContainer }}>
            NHTSA Make ID {makeId}
          </Text>
        </View>
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
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  text: {
    flex: 1,
  },
});
