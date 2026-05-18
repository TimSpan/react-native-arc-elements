// FormRadio.tsx
import { Controller, useFormContext } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import { FormItem } from "./formItem";

export const FormRadio = ({
  name,
  label,
  rules,
  options,
}: {
  name: string;
  label: string;
  rules?: any;
  options: { value: string; label: string }[];
}) => {
  const { control } = useFormContext();

  return (
    <FormItem name={name} label={label}>
      <Controller
        control={control}
        name={name}
        rules={rules ? rules : undefined}
        render={({ field: { value, onChange } }) => (
          <View style={{ flexDirection: "row" }}>
            {options.map((item) => (
              <TouchableOpacity
                key={item.value}
                onPress={() => onChange(item.value)}
                style={{ marginRight: 16 }}
              >
                <Text>
                  {value === item.value ? "🔘" : "⚪"} {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      />
    </FormItem>
  );
};
