// FormSelect.tsx
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { FormItem } from "./formItem";

export const FormSelect = ({
  name,
  label,
  options,
}: {
  name: string;
  label: string;
  options: { value: string; label: string }[];
}) => {
  const { control } = useFormContext();
  const [visible, setVisible] = useState(false);

  return (
    <FormItem name={name} label={label}>
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange } }) => (
          <>
            <TouchableOpacity onPress={() => setVisible(true)}>
              <Text>
                {options.find((i) => i.value === value)?.label || "请选择"}
              </Text>
            </TouchableOpacity>

            <Modal visible={visible} transparent>
              <View>
                {options.map((item) => (
                  <Text
                    key={item.value}
                    onPress={() => {
                      onChange(item.value);
                      setVisible(false);
                    }}
                  >
                    {item.label}
                  </Text>
                ))}
              </View>
            </Modal>
          </>
        )}
      />
    </FormItem>
  );
};
