import { View, Text } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { WithHeaderNavigationProp } from "../routes/type";
import { useSetAtom } from "jotai/react";
import { HEADER_TITLE_RECORD } from "../utils/text";
import { FooterState, FooterStore } from "../store/footer";
import Header from "../components/Header";

export default function RecordPage() {
  /**
   * navigation
   */
  const navigation = useNavigation<WithHeaderNavigationProp>();

  /**
   * set footer options
   */
  const setFooterState = useSetAtom(FooterStore.state);
  useFocusEffect(() => {
    setFooterState(FooterState.RECORD);
  });

  return (
    <>
      <Header title={HEADER_TITLE_RECORD}></Header>
      <View>
        <Text>Record</Text>
      </View>
    </>
  );
}
