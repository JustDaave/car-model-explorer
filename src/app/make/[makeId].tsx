import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { List } from "react-native-paper";

import { getModelsForMakeYear, getVehicleTypesForMake, type Model } from "@/api/vpic";
import AppHeader from "@/components/AppHeader";
import EmptyState from "@/components/EmptyState";
import ErrorState from "@/components/ErrorState";
import LoadingState from "@/components/LoadingState";
import MakeHeaderCard from "@/components/MakeHeaderCard";
import ModelListItem from "@/components/ModelListItem";
import VehicleTypeSelector from "@/components/VehicleTypeSelector";
import YearSelector from "@/components/YearSelector";
import { spacing } from "@/constants/theme";
import { useApiData } from "@/hooks/useApiData";
import { getShortTypeName, getVehicleTypeIcon } from "@/utils/vehicleTypes";
import { getRecentYears } from "@/utils/years";

const YEARS = getRecentYears(30);

// Screen 2: shows the models a make sold, filtered by vehicle type and year
export default function MakeScreen() {
  const params = useLocalSearchParams<{ makeId: string; makeName: string }>();
  const makeId = Number(params.makeId);
  const makeName = params.makeName ?? "";

  const [selectedYear, setSelectedYear] = useState(YEARS[0]);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  // Load the vehicle types this make builds (used for the filter chips)
  const loadVehicleTypes = useCallback(() => getVehicleTypesForMake(makeName), [makeName]);
  const { data: vehicleTypes } = useApiData(loadVehicleTypes);

  // Until the user taps a chip, use the first type (Passenger Car when available)
  const vehicleType = selectedType ?? vehicleTypes?.[0]?.VehicleTypeName ?? "Passenger Car";

  // Load the models again every time the year or vehicle type changes
  const loadModels = useCallback(
    () => getModelsForMakeYear(makeId, selectedYear, vehicleType),
    [makeId, selectedYear, vehicleType]
  );
  const { data: models, loading, error, reload } = useApiData(loadModels);

  const openModel = (model: Model) => {
    router.push({
      pathname: "/model/[modelId]",
      params: {
        modelId: model.Model_ID,
        modelName: model.Model_Name,
        makeId,
        makeName,
        vehicleType,
      },
    });
  };

  // What to show when the list has no rows
  let emptyContent;
  if (loading) {
    emptyContent = <LoadingState message={`Loading ${selectedYear} models...`} />;
  } else if (error) {
    emptyContent = <ErrorState message={error} onRetry={reload} />;
  } else {
    emptyContent = (
      <EmptyState
        icon="car-off"
        title="No models found"
        message={`${makeName} has no ${getShortTypeName(vehicleType).toLowerCase()} models listed for ${selectedYear}. Try another year.`}
      />
    );
  }

  const modelCount = models?.length ?? 0;

  return (
    <View style={styles.screen}>
      <AppHeader title={makeName} subtitle="Models" showBackButton />
      <FlatList
        data={loading || error || !models ? [] : models}
        keyExtractor={(model) => String(model.Model_ID)}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <>
            <MakeHeaderCard makeName={makeName} makeId={makeId} />
            {vehicleTypes && vehicleTypes.length > 1 && (
              <VehicleTypeSelector
                vehicleTypes={vehicleTypes}
                selectedType={vehicleType}
                onSelectType={setSelectedType}
              />
            )}
            <YearSelector years={YEARS} selectedYear={selectedYear} onSelectYear={setSelectedYear} />
            {!loading && !error && modelCount > 0 && (
              <List.Subheader>
                {modelCount} {modelCount === 1 ? "model" : "models"} in {selectedYear}
              </List.Subheader>
            )}
          </>
        }
        renderItem={({ item }) => (
          <ModelListItem
            modelName={item.Model_Name}
            description={`${selectedYear} · ${getShortTypeName(vehicleType)}`}
            icon={getVehicleTypeIcon(vehicleType)}
            onPress={() => openModel(item)}
          />
        )}
        ListEmptyComponent={<View style={styles.emptyArea}>{emptyContent}</View>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  listContent: {
    paddingBottom: spacing.xl,
  },
  emptyArea: {
    minHeight: 280,
  },
});
