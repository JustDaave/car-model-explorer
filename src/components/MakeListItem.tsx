import { List } from "react-native-paper";

import MakeAvatar from "@/components/MakeAvatar";

type MakeListItemProps = {
  makeName: string;
  onPress: () => void;
};

// One row in the list of car makes on the home screen.
export default function MakeListItem({ makeName, onPress }: MakeListItemProps) {
  return (
    <List.Item
      title={makeName}
      titleNumberOfLines={1}
      onPress={onPress}
      accessibilityLabel={`View models from ${makeName}`}
      left={() => <MakeAvatar makeName={makeName} />}
      right={(props) => <List.Icon {...props} icon="chevron-right" />}
      style={{ paddingLeft: 16 }}
    />
  );
}
