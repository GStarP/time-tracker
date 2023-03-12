import { View, StyleSheet, Text } from "react-native";
import { COLOR_PRIMARY, COLOR_WHITE } from "../styles/const";
import IconButton from "../ui/IconButton";
import { useNavigation } from "@react-navigation/native";
import { MainRouterNavigationProp } from "../routes/type";
import { Shadow } from "react-native-shadow-2";

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

  /**
   * shadow
   */
  const shadowDistance = 4;
  return (
    <Shadow
      containerStyle={{ marginBottom: shadowDistance }}
      distance={shadowDistance}
      sides={{
        start: false,
        end: false,
        top: false,
        bottom: true,
      }}
      corners={{
        topStart: false,
        topEnd: false,
        bottomStart: false,
        bottomEnd: false,
      }}
    >
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
    </Shadow>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
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
