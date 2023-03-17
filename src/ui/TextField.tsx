import { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { COLOR_HINT, COLOR_BLACK } from "../styles/const";

export interface TextFieldProps {
  label: string;
  placeholder?: string;
  initValue?: string;
  onChange?: (newVal: string) => void;
}
const DEFAULT_PROPS = {
  placeholder: "点击输入",
  initValue: "",
};

export default function TextField(props: TextFieldProps) {
  const { label, placeholder, initValue, onChange } = {
    ...DEFAULT_PROPS,
    ...props,
  };

  const [value, setValue] = useState(initValue);

  const changeTextHandler = (text: string) => {
    setValue(text);
    onChange && onChange(text);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={changeTextHandler}
        placeholder={placeholder}
        placeholderTextColor={COLOR_HINT}
        cursorColor={COLOR_HINT}
      ></TextInput>
      <View style={styles.divider}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
  input: {
    fontSize: 14,
    color: COLOR_HINT,
  },
  divider: {
    width: "100%",
    height: 0,
    borderTopWidth: 0.5,
    borderTopColor: COLOR_BLACK,
  },
});
