import { StyleSheet, View } from "react-native";

import { Form } from "@/components/form/form";
import { FormInput } from "@/components/form/formInput";
import { FormUpload } from "@/components/form/formUpload";
import { SubmitButton } from "@/components/form/submitButton";

export default function FormExamplesScreen() {
  return (
    <View style={styles.container}>
      <Form
        defaultValues={{
          phone: "17346625362",
          name: "",
          images: [],
        }}
        onSubmit={(values) => console.log(values)}
      >
        <FormInput
          name="name"
          label="姓名"
          rules={{ required: "请输入姓名" }}
        />

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
        <FormUpload name="images" label="上传图片" max={3} />
        <SubmitButton>提交</SubmitButton>
      </Form>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
