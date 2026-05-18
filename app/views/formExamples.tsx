import { StyleSheet, View } from "react-native";

import ArcDatePicker from "@/components/arcDatePicker";
import { Form } from "@/components/form/form";
import { FormInput } from "@/components/form/formInput";
import { FormRadio } from "@/components/form/formRadio";
import { FormUpload } from "@/components/form/formUpload";
import { SubmitButton } from "@/components/form/submitButton";
import { useState } from "react";
import { Button } from "react-native-paper";

export default function FormExamplesScreen() {
  const [visible, setVisible] = useState(false);
  return (
    <View style={styles.container}>
      <Form
        defaultValues={{
          phone: "17346625362",
          name: "",
          type: undefined,
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
        <FormRadio
          name="type"
          label="类型"
          options={[
            { label: "A", value: "a" },
            { label: "B", value: "b" },
          ]}
        />
        <FormUpload name="images" label="上传图片" max={3} />
        <Button
          mode="contained"
          onPress={() => {
            setVisible(true);
          }}
        >
          选择时间
        </Button>
        <ArcDatePicker
          precision="second"
          visible={visible}
          onCancel={() => setVisible(false)}
          onConfirm={(date) => {
            console.log("🚀 ~ FormExamplesScreen ~ date:", date);
          }}
        />
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
