import { StyleSheet, View } from "react-native";
import { Chip, Text, useTheme } from "react-native-paper";

import { spacing } from "@/constants/theme";

type YearAvailabilityGridProps = {
  allYears: number[];
  availableYears: number[];
};

// Grid of year chips. Years the model was sold are filled in with a check,
// years it wasn't sold are faded out.
export default function YearAvailabilityGrid({ allYears, availableYears }: YearAvailabilityGridProps) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Text variant="bodyMedium" style={[styles.summary, { color: theme.colors.onSurfaceVariant }]}>
        Offered in {availableYears.length} of the last {allYears.length} model years
      </Text>
      <View style={styles.grid}>
        {allYears.map((year) => {
          const isAvailable = availableYears.includes(year);
          return (
            <Chip
              key={year}
              mode={isAvailable ? "flat" : "outlined"}
              icon={isAvailable ? "check" : "close"}
              disabled={!isAvailable}
              accessibilityLabel={`${year}: ${isAvailable ? "available" : "not available"}`}
            >
              {year}
            </Chip>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
  },
  summary: {
    marginBottom: spacing.md,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
});
