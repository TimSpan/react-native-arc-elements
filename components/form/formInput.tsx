// FormInput.tsx
import { Controller, useFormContext } from "react-hook-form";
import { Text, TextInput, View } from "react-native";

export const FormInput = ({
  name,
  label,
  rules,
  ...props
}: {
  name: string;
  label?: string;
  rules?: any;
  [key: string]: any;
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value }, fieldState }) => {
        const errorMessage = fieldState.error?.message;
        return (
          <View>
            <TextInput value={value} onChangeText={onChange} {...props} />
            {errorMessage && (
              <Text style={{ color: "red", fontSize: 12 }}>
                {fieldState.error?.message}
              </Text>
            )}
          </View>
        );
      }}
    />
  );
};
