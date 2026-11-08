import { useLocalSearchParams } from "expo-router";
import { useCallback } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Divider, List } from "react-native-paper";

import { getYearsForModel } from "@/api/vpic";
import AppHeader from "@/components/AppHeader";
import DetailRow from "@/components/DetailRow";
import ErrorState from "@/components/ErrorState";
import LoadingState from "@/components/LoadingState";
import ModelHeroCard from "@/components/ModelHeroCard";
import YearAvailabilityGrid from "@/components/YearAvailabilityGrid";
import { spacing } from "@/constants/theme";
import { useApiData } from "@/hooks/useApiData";
import { getShortTypeName, getVehicleTypeIcon } from "@/utils/vehicleTypes";
import { getRecentYears } from "@/utils/years";

const YEARS_TO_CHECK = getRecentYears(12);

// Screen 3: details about one model and which years it was sold
export default function ModelScreen() {
  const params = useLocalSearchParams<{
    modelId: string;
    modelName: string;
    makeId: string;
    makeName: string;
    vehicleType: string;
  }>();
  const modelId = Number(params.modelId);
  const makeId = Number(params.makeId);
  const modelName = params.modelName ?? "";
  const makeName = params.makeName ?? "";
  const vehicleType = params.vehicleType ?? "Passenger Car";

  // Check the last 12 model years to see when this model was offered
  const loadYears = useCallback(
    () => getYearsForModel(makeId, modelId, vehicleType, YEARS_TO_CHECK),
    [makeId, modelId, vehicleType]
  );
  const { data: availableYears, loading, error, reload } = useApiData(loadYears);

  let yearsContent;
  if (loading) {
    yearsContent = <LoadingState message="Checking model years..." />;
  } else if (error) {
    yearsContent = <ErrorState message={error} onRetry={reload} />;
  } else {
    yearsContent = (
      <YearAvailabilityGrid allYears={YEARS_TO_CHECK} availableYears={availableYears ?? []} />
    );
  }

  return (
    <View style={styles.screen}>
      <AppHeader title={modelName} subtitle={makeName} showBackButton />
      <ScrollView contentContainerStyle={styles.content}>
        <ModelHeroCard
          modelName={modelName}
          makeName={makeName}
          icon={getVehicleTypeIcon(vehicleType)}
        />

        <List.Section>
          <List.Subheader>Details</List.Subheader>
          <DetailRow label="Make" value={makeName} icon="factory" />
          <DetailRow label="Vehicle type" value={getShortTypeName(vehicleType)} icon="shape-outline" />
          <DetailRow label="NHTSA Model ID" value={String(modelId)} icon="identifier" />
          <DetailRow label="NHTSA Make ID" value={String(makeId)} icon="pound" />
        </List.Section>

        <Divider style={styles.divider} />

        <List.Subheader>Model years</List.Subheader>
        {yearsContent}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    paddingBottom: spacing.xl,
  },
  divider: {
    marginHorizontal: spacing.md,
  },
});
