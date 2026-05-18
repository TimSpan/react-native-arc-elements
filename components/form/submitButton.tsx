// SubmitButton.tsx
import React, { useContext } from "react";
import { Button } from "react-native-paper";
import { SubmitContext } from "../hooks";

export const SubmitButton = ({ children }: { children: React.ReactNode }) => {
  const submit = useContext(SubmitContext);

  return (
    <Button
      mode="contained"
      onPress={() => {
        submit();
      }}
    >
      {children}
    </Button>
  );
};
