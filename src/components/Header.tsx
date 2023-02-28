import { View, StyleSheet, Text } from "react-native";
import { COLOR_PRIMARY, COLOR_WHITE } from "../styles/const";
import IconButton from "../ui/IconButton";
import { useNavigation } from "@react-navigation/native";
import { MainRouterNavigationProp } from "../routes/type";

export interface HeaderProps {
  showBack?: boolean;
  title: string;
  titleAppend?: JSX.Element | null;
  actions?: JSX.Element | null;
}

export default function Header({
  showBack,
  title,
  titleAppend,
  actions,
}: HeaderProps) {
  if (!showBack) showBack = false;
  if (!titleAppend) titleAppend = null;
  if (!actions) actions = null;

  /**
   * navigation
   */
  const navigation = useNavigation<MainRouterNavigationProp>();

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
      <View style={styles.title}>
        <Text style={styles.titleText}>{title}</Text>
        {titleAppend}
      </View>
      {actions}
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
    flexDirection: "row",
    marginRight: "auto",
  },
  titleText: {
    fontSize: 20,
    color: COLOR_WHITE,
  },
});
