import { View, Text } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { WithHeaderNavigationProp } from "../routes/type";
import { useSetAtom } from "jotai/react";
import { HeaderStore } from "../store";
import { HEADER_TITLE_SETTING } from "../utils/text";
import { FooterState, FooterStore } from "../store/footer";

export default function SettingPage() {
  /**
   * navigation
   */
  const navigation = useNavigation<WithHeaderNavigationProp>();

  /**
   * set header options
   */
  const setHeaderShowBack = useSetAtom(HeaderStore.showBack);
  const setHeaderTitle = useSetAtom(HeaderStore.title);
  useFocusEffect(() => {
    setHeaderShowBack(false);
    setHeaderTitle(HEADER_TITLE_SETTING);
  });
  /**
   * set footer options
   */
  const setFooterState = useSetAtom(FooterStore.state);
  useFocusEffect(() => {
    setFooterState(FooterState.SETTING);
  });

  return (
    <View>
      <Text>Setting</Text>
    </View>
  );
}
