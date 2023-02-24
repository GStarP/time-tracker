import { View, StyleSheet, Text } from "react-native";
import { COLOR_PRIMARY } from "../styles/const";

export default function Footer() {
  return (
    <View style={styles.footer}>
      <Text>Footer</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    height: 64,
    backgroundColor: COLOR_PRIMARY,
    marginTop: "auto",
  },
});
