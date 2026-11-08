import { StyleSheet } from "react-native";
import { List, Surface } from "react-native-paper";

import { spacing } from "@/constants/theme";

type ModelListItemProps = {
  modelName: string;
  description: string;
  icon: string;
  onPress: () => void;
};

// One rounded row in the list of models on the make screen.
export default function ModelListItem({ modelName, description, icon, onPress }: ModelListItemProps) {
  return (
    <Surface elevation={1} style={styles.surface}>
      <List.Item
        title={modelName}
        description={description}
        onPress={onPress}
        accessibilityLabel={`View details for ${modelName}`}
        left={(props) => <List.Icon {...props} icon={icon} />}
        right={(props) => <List.Icon {...props} icon="chevron-right" />}
        style={styles.item}
      />
    </Surface>
  );
}

const styles = StyleSheet.create({
  surface: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.sm,
    borderRadius: 16,
    overflow: "hidden",
  },
  item: {
    paddingLeft: spacing.sm,
  },
});
