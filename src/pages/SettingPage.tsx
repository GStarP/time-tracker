import { View, Text } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { MainRouterNavigationProp } from "../routes/type";
import { useSetAtom } from "jotai/react";
import { HEADER_TITLE_SETTING } from "../utils/text";
import { FooterState, FooterStore } from "../store";
import Header from "../components/Header";

export default function SettingPage() {
  /**
   * navigation
   */
  const navigation = useNavigation<MainRouterNavigationProp>();

  /**
   * set footer options
   */
  const setFooterState = useSetAtom(FooterStore.state);
  useFocusEffect(() => {
    setFooterState(FooterState.SETTING);
  });

  return (
    <>
      <Header title={HEADER_TITLE_SETTING}></Header>
      <View>
        <Text>Setting</Text>
      </View>
    </>
  );
}
