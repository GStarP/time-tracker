import { useAtom } from "jotai/react";
import { View, StyleSheet, Text } from "react-native";
import { HeaderStore } from "../store";
import { COLOR_PRIMARY } from "../styles/const";

export default function Header() {
  const [title] = useAtom(HeaderStore.title);
  const [HeaderActions] = useAtom(HeaderStore.actions);

  return (
    <View style={styles.header}>
      <Text>{title}</Text>
      {HeaderActions}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 64,
    backgroundColor: COLOR_PRIMARY,
  },
});
