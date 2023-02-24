import { View, StyleSheet, Text } from "react-native";
import { COLOR_PRIMARY } from "../styles/const";

export default function Header() {
  return (
    <View style={styles.header}>
      <Text>Header</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 64,
    backgroundColor: COLOR_PRIMARY,
  },
});
