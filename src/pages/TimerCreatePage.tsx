import { View, Text } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { WithHeaderNavigationProp } from "../routes/type";
import { useSetAtom } from "jotai/react";
import { HeaderStore } from "../store";
import { HEADER_TIMER_CREATE_PAGE, HEADER_TITLE_RECORD } from "../utils/text";

export default function TimerCreatePage() {
  /**
   * navigation
   */
  const navigation = useNavigation<WithHeaderNavigationProp>();
  const setHeaderTitle = useSetAtom(HeaderStore.title);
  useFocusEffect(() => {
    setHeaderTitle(HEADER_TIMER_CREATE_PAGE);
  });

  return (
    <View>
      <Text>Timer Create</Text>
    </View>
  );
}
