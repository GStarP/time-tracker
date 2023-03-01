import { View, StyleSheet, TouchableOpacity } from "react-native";
import { COLOR_BLACK, COLOR_PRIMARY, COLOR_WHITE } from "../styles/const";
import { useAtom } from "jotai";
import { FooterState, FooterStore } from "../store";
import IconButton from "../ui/IconButton";
import { useNavigation } from "@react-navigation/native";
import {
  FIRST_VIEW_PAGE_NAME,
  MATTER_PAGE_NAME,
  RECORD_PAGE_NAME,
  SETTING_PAGE_NAME,
  STATS_PAGE_NAME,
  TIMER_CREATE_PAGE_NAME,
  MainRouterNavigationProp,
} from "../routes/type";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function Footer() {
  const [state] = useAtom(FooterStore.state);

  const iconColor = (selfState: FooterState): string => {
    return state === selfState ? COLOR_PRIMARY : COLOR_BLACK;
  };

  /**
   * navigation
   */
  const navigation = useNavigation<MainRouterNavigationProp>();

  return (
    <View style={styles.footer}>
      <View style={styles.iconContainer}>
        <IconButton
          iconName="event-note"
          iconColor={iconColor(FooterState.MATTER_OR_TARGET)}
          onPress={() =>
            navigation.navigate("FirstView", { screen: "MatterOrTarget" })
          }
        />
        <IconButton
          iconName="restore"
          iconSize={26}
          iconColor={iconColor(FooterState.RECORD)}
          onPress={() =>
            navigation.navigate(FIRST_VIEW_PAGE_NAME, {
              screen: RECORD_PAGE_NAME,
            })
          }
        />
      </View>
      {/* take up space for the floating center-button */}
      <View style={styles.placeHolder}></View>
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.centerButton}
        onPress={() => navigation.navigate(TIMER_CREATE_PAGE_NAME)}
      >
        <MaterialIcons name="alarm" size={24} color={COLOR_WHITE} />
      </TouchableOpacity>
      <View style={styles.iconContainer}>
        <IconButton
          iconName="pie-chart"
          iconColor={iconColor(FooterState.STATS)}
          onPress={() =>
            navigation.navigate(FIRST_VIEW_PAGE_NAME, {
              screen: STATS_PAGE_NAME,
            })
          }
        />
        <IconButton
          iconName="settings"
          iconColor={iconColor(FooterState.SETTING)}
          onPress={() =>
            navigation.navigate(FIRST_VIEW_PAGE_NAME, {
              screen: SETTING_PAGE_NAME,
            })
          }
        />
      </View>
    </View>
  );
}

/**
 * styles
 */
const CENTER_BTN_SIZE = 48;
const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    alignItems: "center",
    height: 48,
    backgroundColor: COLOR_WHITE,
    elevation: 6,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    flex: 1,
  },
  placeHolder: {
    width: CENTER_BTN_SIZE,
  },
  centerButton: {
    position: "absolute",
    left: "50%",
    top: -CENTER_BTN_SIZE / 2,
    marginLeft: -CENTER_BTN_SIZE / 2,
    justifyContent: "center",
    alignItems: "center",
    width: CENTER_BTN_SIZE,
    height: CENTER_BTN_SIZE,
    borderRadius: CENTER_BTN_SIZE / 2,
    backgroundColor: COLOR_PRIMARY,
    elevation: 4,
  },
});
