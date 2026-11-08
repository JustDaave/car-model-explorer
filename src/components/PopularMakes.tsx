import { ScrollView, StyleSheet } from "react-native";
import { Chip, List } from "react-native-paper";

import type { Make } from "@/api/vpic";
import { spacing } from "@/constants/theme";

type PopularMakesProps = {
  makes: Make[];
  onSelectMake: (make: Make) => void;
};

// These are the brands people look up the most, so they get shortcuts
const POPULAR_MAKE_NAMES = ["TOYOTA", "HONDA", "FORD", "CHEVROLET", "TESLA", "BMW", "SUBARU", "HYUNDAI"];

// Horizontal row of chips for quick access to popular brands.
export default function PopularMakes({ makes, onSelectMake }: PopularMakesProps) {
  const popularMakes = POPULAR_MAKE_NAMES.map((name) =>
    makes.find((make) => make.MakeName === name)
  ).filter((make): make is Make => make !== undefined);

  if (popularMakes.length === 0) return null;

  return (
    <>
      <List.Subheader>Popular</List.Subheader>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
      >
        {popularMakes.map((make) => (
          <Chip
            key={make.MakeId}
            icon="star-outline"
            mode="outlined"
            onPress={() => onSelectMake(make)}
          >
            {make.MakeName}
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
    paddingBottom: spacing.sm,
  },
});
