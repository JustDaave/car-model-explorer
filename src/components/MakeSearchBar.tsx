import { StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";

import { spacing } from "@/constants/theme";

type MakeSearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
};

// M3 search bar used to filter the list of car makes by name.
export default function MakeSearchBar({ value, onChangeText }: MakeSearchBarProps) {
  return (
    <Searchbar
      placeholder="Search makes"
      value={value}
      onChangeText={onChangeText}
      style={styles.searchBar}
      autoCorrect={false}
      autoCapitalize="characters"
      accessibilityLabel="Search car makes"
    />
  );
}

const styles = StyleSheet.create({
  searchBar: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
});
