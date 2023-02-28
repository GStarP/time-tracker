import { View, Text } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { WithHeaderNavigationProp } from "../routes/type";
import { useSetAtom } from "jotai/react";
import { HEADER_TITLE_STATS } from "../utils/text";
import { FooterState, FooterStore } from "../store/footer";
import Header from "../components/Header";

export default function StatsPage() {
  /**
   * navigation
   */
  const navigation = useNavigation<WithHeaderNavigationProp>();

  /**
   * set footer options
   */
  const setFooterState = useSetAtom(FooterStore.state);
  useFocusEffect(() => {
    setFooterState(FooterState.STATS);
  });

  return (
    <>
      <Header title={HEADER_TITLE_STATS}></Header>
      <View>
        <Text>Stats</Text>
      </View>
    </>
  );
}
