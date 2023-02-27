import { useAtom } from "jotai/react";
import { View, StyleSheet, Text } from "react-native";
import { HeaderStore } from "../store";
import { COLOR_PRIMARY, COLOR_WHITE } from "../styles/const";
import IconButton from "../ui/IconButton";
import { useNavigation } from "@react-navigation/native";
import { WithHeaderNavigationProp } from "../routes/type";

export default function Header() {
  const [title] = useAtom(HeaderStore.title);
  const [showBack] = useAtom(HeaderStore.showBack);
  const [HeaderActions] = useAtom(HeaderStore.actions);

  /**
   * navigation
   */
  const navigation = useNavigation<WithHeaderNavigationProp>();

  return (
    <View style={styles.header}>
      {showBack ? (
        <IconButton
          style={[styles.back]}
          iconName="close"
          iconColor={COLOR_WHITE}
          onPress={() => navigation.goBack()}
        ></IconButton>
      ) : null}
      <Text style={styles.title}>{title}</Text>
      {HeaderActions}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    height: 56,
    backgroundColor: COLOR_PRIMARY,
    paddingHorizontal: 16,
  },
  back: { marginRight: 28 },
  title: {
    fontSize: 20,
    color: COLOR_WHITE,
    marginRight: "auto",
  },
});
