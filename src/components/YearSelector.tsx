import { ScrollView, StyleSheet } from "react-native";
import { Chip, List } from "react-native-paper";

import { spacing } from "@/constants/theme";

type YearSelectorProps = {
  years: number[];
  selectedYear: number;
  onSelectYear: (year: number) => void;
};

// Row of M3 filter chips for choosing a model year.
export default function YearSelector({ years, selectedYear, onSelectYear }: YearSelectorProps) {
  return (
    <>
      <List.Subheader>Model year</List.Subheader>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
      >
        {years.map((year) => (
          <Chip
            key={year}
            // M3 filter chips are filled in when selected
            mode={year === selectedYear ? "flat" : "outlined"}
            selected={year === selectedYear}
            onPress={() => onSelectYear(year)}
            accessibilityLabel={`Show ${year} models`}
          >
            {year}
          </Chip>
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
  },
});
