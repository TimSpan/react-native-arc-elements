// FormUpload.tsx
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
    ActivityIndicator,
    Alert,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { FormItem } from "./formItem";
export const FormUpload = ({
  name,
  label,
  max = 1,
}: {
  name: string;
  label: string;
  max?: number;
}) => {
  const [image, setImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { control } = useFormContext();

  const pickImage = async (onChange: (value: any) => void, value: any) => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert("需要获得许可", "需要获得访问图片库的权限");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setIsUploading(true);
      //   如果是获取签名上传、这里去调用 onChange 改变表单值即可
      //   显示照片用本地路径即可
      //   拍照上传 只是调用方法 不一样罢了
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsUploading(false);
    }

    // if (!result.canceled) {
    //   const newList = [...value, ...result.assets].slice(0, max);
    //   onChange(newList);
    // }
  };

  return (
    <FormItem name={name} label={label}>
      <Controller
        control={control}
        name={name}
        render={({ field: { value = [], onChange } }) => (
          <View style={{ flexDirection: "row" }}>
            {image && (
              <View style={styles.imageContainer}>
                <Image
                  resizeMode="cover"
                  source={{ uri: image }}
                  style={styles.image}
                />
                {isUploading && (
                  <View style={styles.overlay}>
                    <ActivityIndicator size="small" color="#fff" />
                    <Text style={{ color: "#fff", fontSize: 12 }}>
                      上传中...
                    </Text>
                  </View>
                )}
              </View>
            )}
            {/* {value.map((uri: any, index: Key | null | undefined) => (
              <Image
                key={index}
                source={{ uri }}
                style={{ width: 60, height: 60 }}
              />
            ))} */}

            {value.length < max && (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => pickImage(onChange, value)}
                style={styles.upLoadStyle}
              >
                <MaterialIcons name={"photo-camera"} size={50} color={"#aaa"} />
              </TouchableOpacity>
            )}
          </View>
        )}
      />
    </FormItem>
  );
};
const styles = StyleSheet.create({
  image: {
    width: 60,
    height: 60,
    borderRadius: 6,
    marginRight: 10,
  },
  imageContainer: {
    position: "relative",
    marginRight: 10,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  upLoadStyle: {
    height: 60,
    width: 60,
    backgroundColor: "#fafafa",
    borderWidth: 1,
    borderColor: "#aaa",
    borderStyle: "dashed",
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
});

// import React from "react";
// import { View, Image, Pressable, Text } from "react-native";
// import { useController, useFormContext } from "react-hook-form";
// import * as ImagePicker from "expo-image-picker";

// export const FormUpload = ({
//   name,
//   label,
//   max = 3,
// }: {
//   name: string;
//   label: string;
//   max?: number;
// }) => {
//   const { control } = useFormContext();

//   const {
//     field: { value = [], onChange },
//   } = useController({ name, control });

//   const pickImage = async () => {
//     const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

//     if (!permission.granted) return;

//     const result = await ImagePicker.launchImageLibraryAsync({
//       allowsMultipleSelection: true,
//       quality: 0.8,
//     });

//     if (!result.canceled) {
//       const newList = [...value, ...result.assets].slice(0, max);
//       onChange(newList);
//     }
//   };

//   return (
//     <View>
//       <Text>{label}</Text>

//       <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
//         {value.map(
//           (item: { uri: any }, index: React.Key | null | undefined) => (
//             <Image
//               key={index}
//               source={{ uri: item.uri }}
//               style={{ width: 80, height: 80, margin: 5 }}
//             />
//           ),
//         )}

//         {value.length < max && (
//           <Pressable onPress={pickImage}>
//             <View
//               style={{
//                 width: 80,
//                 height: 80,
//                 backgroundColor: "#eee",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <Text>+</Text>
//             </View>
//           </Pressable>
//         )}
//       </View>
//     </View>
//   );
// };
