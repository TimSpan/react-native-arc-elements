import { StyleSheet } from "react-native";

import { Form } from "@/components/form/form";
import { FormInput } from "@/components/form/formInput";
import { SubmitButton } from "@/components/form/submitButton";

export default function FormExamplesScreen() {
  return (
    <Form
      defaultValues={{ phone: "", name: "" }}
      onSubmit={(values) => console.log(values)}
    >
      <FormInput name="name" label="姓名" rules={{ required: "请输入姓名" }} />

      <FormInput
        name="phone"
        label="手机号"
        rules={{
          required: "请输入手机号",
          pattern: {
            value: /^1\d{10}$/,
            message: "手机号格式错误",
          },
        }}
      />

      <SubmitButton>提交</SubmitButton>
    </Form>
  );
}

const styles = StyleSheet.create({});
