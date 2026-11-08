import { ScrollView, StyleSheet } from "react-native";
import { Chip, List } from "react-native-paper";

import type { VehicleType } from "@/api/vpic";
import { spacing } from "@/constants/theme";
import { getShortTypeName, getVehicleTypeIcon } from "@/utils/vehicleTypes";

type VehicleTypeSelectorProps = {
  vehicleTypes: VehicleType[];
  selectedType: string;
  onSelectType: (typeName: string) => void;
};

// Row of M3 filter chips for choosing a vehicle type (car, truck, SUV...).
export default function VehicleTypeSelector({
  vehicleTypes,
  selectedType,
  onSelectType,
}: VehicleTypeSelectorProps) {
  return (
    <>
      <List.Subheader>Vehicle type</List.Subheader>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
      >
        {vehicleTypes.map((type) => (
          <Chip
            key={type.VehicleTypeId}
            // M3 filter chips are filled in when selected
            mode={type.VehicleTypeName === selectedType ? "flat" : "outlined"}
            icon={getVehicleTypeIcon(type.VehicleTypeName)}
            selected={type.VehicleTypeName === selectedType}
            showSelectedCheck={false}
            onPress={() => onSelectType(type.VehicleTypeName)}
          >
            {getShortTypeName(type.VehicleTypeName)}
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
