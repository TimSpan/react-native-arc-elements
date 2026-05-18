// Form.tsx
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { View } from "react-native";
import { SubmitContext } from "../hooks";

export const Form = ({
  children,
  defaultValues,
  onSubmit,
}: {
  children: React.ReactNode;
  defaultValues?: any;
  onSubmit: (data: any) => void;
}) => {
  const methods = useForm({
    defaultValues,
  });

  return (
    <FormProvider {...methods}>
      <SubmitContext.Provider value={methods.handleSubmit(onSubmit)}>
        <View>{children}</View>
      </SubmitContext.Provider>
    </FormProvider>
  );
};
