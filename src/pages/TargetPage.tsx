import { View, StyleSheet, Text } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import {
  FIRST_VIEW_PAGE_NAME,
  MainRouterNavigationProp,
  MATTER_OR_TARGET_PAGE_NAME,
  MATTER_PAGE_NAME,
  TARGET_EDIT_PAGE_NAME,
} from "../routes/type";
import { useSetAtom } from "jotai/react";
import { HEADER_TITLE_TARGET } from "../utils/text";
import { FooterState, FooterStore } from "../store";
import Header from "../components/Header";
import IconButton from "../ui/IconButton";
import { COLOR_WHITE } from "../styles/const";
import { useMemo } from "react";
import { HeaderStore } from "../store/header";

export default function TargetPage() {
  /**
   * navigation
   */
  const navigation = useNavigation<MainRouterNavigationProp>();

  /**
   * set footer options
   */
  const setFooterState = useSetAtom(FooterStore.state);
  useFocusEffect(() => {
    setFooterState(FooterState.MATTER_OR_TARGET);
  });

  /**
   * Header
   */
  const HeaderTitleAppend = useMemo(() => {
    return (
      <View style={{ marginTop: -2 }}>
        <IconButton
          style={[{ position: "absolute", top: -8, left: -8 }]}
          iconName="autorenew"
          iconSize={20}
          iconColor={COLOR_WHITE}
          onPress={() =>
            navigation.navigate(FIRST_VIEW_PAGE_NAME, {
              screen: MATTER_OR_TARGET_PAGE_NAME,
              params: {
                screen: MATTER_PAGE_NAME,
              },
            })
          }
        />
      </View>
    );
  }, []);
  const HeaderActions = useMemo(() => {
    return (
      <View>
        <IconButton
          iconName="add-circle-outline"
          iconColor={COLOR_WHITE}
          onPress={() =>
            navigation.navigate(TARGET_EDIT_PAGE_NAME, { isEdit: false })
          }
        />
      </View>
    );
  }, []);
  const setHeaderTitle = useSetAtom(HeaderStore.title);
  const setHeaderTitleAppend = useSetAtom(HeaderStore.titleAppend);
  const setHeaderActions = useSetAtom(HeaderStore.actions);
  useFocusEffect(() => {
    setHeaderTitle(HEADER_TITLE_TARGET);
    setHeaderTitleAppend(HeaderTitleAppend);
    setHeaderActions(HeaderActions);
  });

  return (
    <View>
      <Text>Target</Text>
    </View>
  );
}
