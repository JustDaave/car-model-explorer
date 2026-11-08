import { router } from "expo-router";
import { useState } from "react";
import { SectionList, StyleSheet, View } from "react-native";
import { List, Text, useTheme } from "react-native-paper";

import { getCarMakes, type Make } from "@/api/vpic";
import AppHeader from "@/components/AppHeader";
import EmptyState from "@/components/EmptyState";
import ErrorState from "@/components/ErrorState";
import LoadingState from "@/components/LoadingState";
import MakeListItem from "@/components/MakeListItem";
import MakeSearchBar from "@/components/MakeSearchBar";
import PopularMakes from "@/components/PopularMakes";
import { spacing } from "@/constants/theme";
import { useApiData } from "@/hooks/useApiData";

// Groups the makes by their first letter for the SectionList: A, B, C...
function groupMakesByLetter(makes: Make[]) {
  const groups: { title: string; data: Make[] }[] = [];

  for (const make of makes) {
    const firstChar = make.MakeName[0];
    const letter = /[A-Z]/.test(firstChar) ? firstChar : "#";
    const lastGroup = groups[groups.length - 1];

    if (lastGroup && lastGroup.title === letter) {
      lastGroup.data.push(make);
    } else {
      groups.push({ title: letter, data: [make] });
    }
  }

  return groups;
}

// Screen 1: list of every car make with search
export default function MakesScreen() {
  const theme = useTheme();
  const [searchText, setSearchText] = useState("");
  const { data: makes, loading, error, reload } = useApiData(getCarMakes);

  const openMake = (make: Make) => {
    router.push({
      pathname: "/make/[makeId]",
      params: { makeId: make.MakeId, makeName: make.MakeName },
    });
  };

  const filteredMakes = (makes ?? []).filter((make) =>
    make.MakeName.toLowerCase().includes(searchText.trim().toLowerCase())
  );
  const isSearching = searchText.trim().length > 0;

  // Decide what goes under the search bar: loading, error, or the list
  let content;
  if (loading) {
    content = <LoadingState message="Loading car makes..." />;
  } else if (error) {
    content = <ErrorState message={error} onRetry={reload} />;
  } else {
    content = (
      <SectionList
        sections={groupMakesByLetter(filteredMakes)}
        keyExtractor={(make) => String(make.MakeId)}
        keyboardShouldPersistTaps="handled"
        stickySectionHeadersEnabled={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <>
            {!isSearching && <PopularMakes makes={makes ?? []} onSelectMake={openMake} />}
            <Text variant="labelLarge" style={[styles.count, { color: theme.colors.onSurfaceVariant }]}>
              {filteredMakes.length} {filteredMakes.length === 1 ? "make" : "makes"}
            </Text>
          </>
        }
        renderSectionHeader={({ section }) => (
          <List.Subheader style={{ color: theme.colors.primary }}>{section.title}</List.Subheader>
        )}
        renderItem={({ item }) => (
          <MakeListItem makeName={item.MakeName} onPress={() => openMake(item)} />
        )}
        ListEmptyComponent={
          <EmptyState
            icon="magnify-close"
            title="No makes found"
            message={`Nothing matches "${searchText}". Try a different spelling.`}
          />
        }
      />
    );
  }

  return (
    <View style={styles.screen}>
      <AppHeader title="Car Model Explorer" size="large" />
      <MakeSearchBar value={searchText} onChangeText={setSearchText} />
      {content}
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
  count: {
    marginHorizontal: spacing.md,
    marginTop: spacing.sm,
  },
});
