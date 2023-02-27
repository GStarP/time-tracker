import { View, Text } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { WithHeaderNavigationProp } from "../routes/type";
import { useSetAtom } from "jotai/react";
import { HeaderStore } from "../store";
import { HEADER_TITLE_RECORD } from "../utils/text";
import { FooterState, FooterStore } from "../store/footer";

export default function RecordPage() {
  /**
   * navigation
   */
  const navigation = useNavigation<WithHeaderNavigationProp>();
  const setHeaderTitle = useSetAtom(HeaderStore.title);
  const setFooterState = useSetAtom(FooterStore.state);
  useFocusEffect(() => {
    setHeaderTitle(HEADER_TITLE_RECORD);
    setFooterState(FooterState.RECORD);
  });

  return (
    <View>
      <Text>Record</Text>
    </View>
  );
}
