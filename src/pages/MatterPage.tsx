import { View, StyleSheet, Text } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import {
  MATTER_EDIT_PAGE_NAME,
  MainRouterNavigationProp,
  FIRST_VIEW_PAGE_NAME,
  MATTER_OR_TARGET_PAGE_NAME,
  TARGET_PAGE_NAME,
} from "../routes/type";
import { useSetAtom } from "jotai/react";
import { HEADER_TITLE_MATTER } from "../utils/text";
import { useEffect, useState, useMemo } from "react";
import { DA } from "../data";
import { Matter } from "../data/matter";
import { FooterState, FooterStore } from "../store";
import Header from "../components/Header";
import IconButton from "../ui/IconButton";
import { COLOR_WHITE } from "../styles/const";
import { HeaderStore } from "../store/header";

export default function MatterPage() {
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
          iconName="autorenew"
          iconSize={20}
          iconColor={COLOR_WHITE}
          onPress={() =>
            navigation.navigate(FIRST_VIEW_PAGE_NAME, {
              screen: MATTER_OR_TARGET_PAGE_NAME,
              params: {
                screen: TARGET_PAGE_NAME,
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
          onPress={() => navigation.navigate(MATTER_EDIT_PAGE_NAME)}
        />
      </View>
    );
  }, []);
  const setHeaderTitle = useSetAtom(HeaderStore.title);
  const setHeaderTitleAppend = useSetAtom(HeaderStore.titleAppend);
  const setHeaderActions = useSetAtom(HeaderStore.actions);
  useFocusEffect(() => {
    setHeaderTitle(HEADER_TITLE_MATTER);
    setHeaderTitleAppend(HeaderTitleAppend);
    setHeaderActions(HeaderActions);
  });

  /**
   * matters
   */
  const [matters, setMatters] = useState<Matter[]>([]);
  useEffect(() => {
    DA()
      .getAllMatter()
      .then((res) => setMatters(res));
  }, []);

  return (
    <View>
      <Text>Matter</Text>
      {matters.map((matter) => (
        <Text key={"matter-" + matter.matterId}>{JSON.stringify(matter)}</Text>
      ))}
    </View>
  );
}
