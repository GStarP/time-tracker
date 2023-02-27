import { View, Text } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { WithHeaderNavigationProp } from "../routes/type";
import { useSetAtom } from "jotai/react";
import { HeaderStore } from "../store";
import { HEADER_TIMER_CREATE_PAGE } from "../utils/text";

export default function TimerCreatePage() {
  /**
   * set header options
   */
  const setHeaderShowBack = useSetAtom(HeaderStore.showBack);
  const setHeaderTitle = useSetAtom(HeaderStore.title);
  useFocusEffect(() => {
    setHeaderShowBack(true);
    setHeaderTitle(HEADER_TIMER_CREATE_PAGE);
  });

  return (
    <View>
      <Text>Timer Create</Text>
    </View>
  );
}
