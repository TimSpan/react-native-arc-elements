// Form.tsx
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { View } from "react-native";
import { SubmitContext } from "../hooks";

export const Form = ({ children, defaultValues, onSubmit }) => {
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
