import { View, Text } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import {
  RECORD_EDIT_PAGE_NAME,
  MainRouterNavigationProp,
} from "../routes/type";
import { useSetAtom } from "jotai/react";
import { HEADER_TITLE_RECORD } from "../utils/text";
import { FooterState, FooterStore } from "../store";
import Header from "../components/Header";
import { useMemo } from "react";
import IconButton from "../ui/IconButton";
import { COLOR_WHITE } from "../styles/const";

export default function RecordPage() {
  /**
   * navigation
   */
  const navigation = useNavigation<MainRouterNavigationProp>();

  /**
   * set footer options
   */
  const setFooterState = useSetAtom(FooterStore.state);
  useFocusEffect(() => {
    setFooterState(FooterState.RECORD);
  });

  /**
   * Header
   */
  const HeaderActions = useMemo(() => {
    return (
      <View>
        <IconButton
          iconName="add-circle-outline"
          iconColor={COLOR_WHITE}
          onPress={() => navigation.navigate(RECORD_EDIT_PAGE_NAME)}
        />
      </View>
    );
  }, []);

  return (
    <>
      <Header title={HEADER_TITLE_RECORD} actions={HeaderActions}></Header>
      <View>
        <Text>Record</Text>
      </View>
    </>
  );
}
