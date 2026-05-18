// FormItem.tsx
import { Text, View } from "react-native";
import { Divider } from "react-native-paper";

export const FormItem = ({
  name,
  label,
  errorMessage,
  children,
}: {
  name: string;
  label?: string;
  errorMessage?: string;
  children: React.ReactNode;
}) => {
  return (
    <View style={{ marginBottom: 16 }}>
      {label && <Text>{label}</Text>}
      {children}
      <Divider />
      {errorMessage && (
        <Text style={{ color: "red", fontSize: 12 }}>{errorMessage}</Text>
      )}
    </View>
  );
};
