// import React from "react";
// import { useForm, FormProvider } from "react-hook-form";
// import { View } from "react-native";
// import { renderField } from "./renderer";
// import { SubmitButton } from "../form/submitButton";

// export const FormPro = ({ schema, onSubmit, defaultValues = {} }) => {
//   const methods = useForm({ defaultValues });

//   return (
//     <FormProvider {...methods}>
//       <View>
//         {schema.map((field) => renderField(field))}

//         <SubmitButton onPress={methods.handleSubmit(onSubmit)}>
//           提交
//         </SubmitButton>
//       </View>
//     </FormProvider>
//   );
// };
