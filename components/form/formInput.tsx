// FormInput.tsx
import { Controller, useFormContext } from "react-hook-form";
import { TextInput } from "react-native";
import { FormItem } from "./formItem";

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
          <FormItem name={name} label={label} errorMessage={errorMessage}>
            <TextInput value={value} onChangeText={onChange} {...props} />
          </FormItem>
        );
      }}
    />
  );
};
