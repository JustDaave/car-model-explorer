import { router } from "expo-router";
import { Appbar } from "react-native-paper";

type AppHeaderProps = {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  // "large" is the M3 large top app bar used on the main screen
  size?: "small" | "large";
};

// Material 3 top app bar shown at the top of every screen.
export default function AppHeader({
  title,
  subtitle,
  showBackButton = false,
  size = "small",
}: AppHeaderProps) {
  return (
    <Appbar.Header mode={size} elevated={false}>
      {showBackButton && (
        <Appbar.BackAction onPress={() => router.back()} accessibilityLabel="Go back" />
      )}
      <Appbar.Content title={title} subtitle={subtitle} />
    </Appbar.Header>
  );
}
