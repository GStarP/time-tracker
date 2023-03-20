import { View, Text } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { MainRouterNavigationProp } from "../routes/type";
import { useSetAtom } from "jotai/react";
import { HEADER_TITLE_STATS } from "../modules/text";
import { FooterState, FooterStore } from "../store";
import Header from "../components/Header";
import { HeaderStore } from "../store/header";

export default function StatsPage() {
  /**
   * navigation
   */
  const navigation = useNavigation<MainRouterNavigationProp>();

  /**
   * set footer options
   */
  const setFooterState = useSetAtom(FooterStore.state);
  useFocusEffect(() => {
    setFooterState(FooterState.STATS);
  });

  /**
   * Header
   */
  const setHeaderTitle = useSetAtom(HeaderStore.title);
  const setHeaderTitleAppend = useSetAtom(HeaderStore.titleAppend);
  const setHeaderActions = useSetAtom(HeaderStore.actions);
  useFocusEffect(() => {
    setHeaderTitle(HEADER_TITLE_STATS);
    setHeaderTitleAppend(null);
    setHeaderActions(null);
  });

  return (
    <View>
      <Text>Stats</Text>
    </View>
  );
}
