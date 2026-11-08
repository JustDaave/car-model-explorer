import { MD3DarkTheme, MD3LightTheme, type MD3Theme } from "react-native-paper";

// Material 3 color scheme made from a blue seed color (#0061A4)
// using the Material Theme Builder. Paper's MD3 themes give us the
// M3 type scale, shapes and the rest of the color roles.

export const lightTheme: MD3Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#0061A4",
    onPrimary: "#FFFFFF",
    primaryContainer: "#D1E4FF",
    onPrimaryContainer: "#001D36",
    secondary: "#535F70",
    onSecondary: "#FFFFFF",
    secondaryContainer: "#D7E3F7",
    onSecondaryContainer: "#101C2B",
    tertiary: "#6B5778",
    onTertiary: "#FFFFFF",
    tertiaryContainer: "#F2DAFF",
    onTertiaryContainer: "#251431",
    error: "#BA1A1A",
    onError: "#FFFFFF",
    errorContainer: "#FFDAD6",
    onErrorContainer: "#410002",
    background: "#F8F9FF",
    onBackground: "#191C20",
    surface: "#F8F9FF",
    onSurface: "#191C20",
    surfaceVariant: "#DFE2EB",
    onSurfaceVariant: "#43474E",
    outline: "#73777F",
    outlineVariant: "#C3C7CF",
    inverseSurface: "#2E3135",
    inverseOnSurface: "#EFF0F7",
    inversePrimary: "#9ECAFF",
    elevation: {
      level0: "transparent",
      level1: "#EEF2FA",
      level2: "#E7EDF7",
      level3: "#E0E9F5",
      level4: "#DEE7F4",
      level5: "#D9E4F2",
    },
  },
};

export const darkTheme: MD3Theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#9ECAFF",
    onPrimary: "#003258",
    primaryContainer: "#00497D",
    onPrimaryContainer: "#D1E4FF",
    secondary: "#BBC7DB",
    onSecondary: "#253140",
    secondaryContainer: "#3B4858",
    onSecondaryContainer: "#D7E3F7",
    tertiary: "#D6BEE4",
    onTertiary: "#3B2948",
    tertiaryContainer: "#523F5F",
    onTertiaryContainer: "#F2DAFF",
    error: "#FFB4AB",
    onError: "#690005",
    errorContainer: "#93000A",
    onErrorContainer: "#FFDAD6",
    background: "#111418",
    onBackground: "#E1E2E8",
    surface: "#111418",
    onSurface: "#E1E2E8",
    surfaceVariant: "#43474E",
    onSurfaceVariant: "#C3C7CF",
    outline: "#8D9199",
    outlineVariant: "#43474E",
    inverseSurface: "#E1E2E8",
    inverseOnSurface: "#2E3135",
    inversePrimary: "#0061A4",
    elevation: {
      level0: "transparent",
      level1: "#1B2128",
      level2: "#1F262F",
      level3: "#232C36",
      level4: "#242E38",
      level5: "#27323D",
    },
  },
};

// The M3 spacing scale is built on 4dp steps
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};
