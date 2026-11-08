import { Avatar, useTheme } from "react-native-paper";

type MakeAvatarProps = {
  makeName: string;
  size?: number;
};

// Turns "ASTON MARTIN" into "AM" and "TESLA" into "TE"
function getInitials(makeName: string) {
  const words = makeName.split(/[\s-]+/).filter(Boolean);
  if (words.length > 1) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return makeName.slice(0, 2).toUpperCase();
}

// Round badge with the make's initials (the API doesn't give us logos).
export default function MakeAvatar({ makeName, size = 40 }: MakeAvatarProps) {
  const theme = useTheme();

  return (
    <Avatar.Text
      label={getInitials(makeName)}
      size={size}
      style={{ backgroundColor: theme.colors.primaryContainer }}
      color={theme.colors.onPrimaryContainer}
    />
  );
}
