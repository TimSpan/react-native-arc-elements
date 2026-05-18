// FormItem.tsx
import { Text, View } from "react-native";

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
  // const {
  //   formState: { errors },
  // } = useFormContext();

  // const error = errors[name];

  return (
    <View style={{ marginBottom: 16 }}>
      {label && <Text>{label}</Text>}
      {children}
      {errorMessage && (
        <Text style={{ color: "red", fontSize: 12 }}>{errorMessage}</Text>
      )}
    </View>
  );
};
