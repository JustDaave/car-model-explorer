import { List } from "react-native-paper";

type DetailRowProps = {
  label: string;
  value: string;
  icon: string;
};

// A label + value row used in the "Details" section of the model screen.
export default function DetailRow({ label, value, icon }: DetailRowProps) {
  return (
    <List.Item
      title={value}
      description={label}
      left={(props) => <List.Icon {...props} icon={icon} />}
      style={{ paddingLeft: 8 }}
    />
  );
}
