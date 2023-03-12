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
import IconButton from "../ui/IconButton";
import { COLOR_WHITE } from "../styles/const";
import { HeaderStore } from "../store/header";
import MatterItem from "../components/matter/MatterItem";
import DraggableFlatList, {
  RenderItemParams,
} from "react-native-draggable-flatlist";

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
          style={{ position: "absolute", top: -8, left: -8 }}
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
          onPress={() =>
            navigation.navigate(MATTER_EDIT_PAGE_NAME, { isEdit: false })
          }
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
    // DA()
    //   .getAllMatter()
    //   .then((res) => setMatters(res));
    // @TEST
    setMatters([
      { matterId: 1, matterName: "学习", matterIcon: 1, matterColor: 1 },
      { matterId: 2, matterName: "运动", matterIcon: 2, matterColor: 2 },
      { matterId: 3, matterName: "游戏", matterIcon: 3, matterColor: 3 },
    ]);
  }, []);

  const renderMatterItem = ({ item, drag }: RenderItemParams<Matter>) => {
    return (
      // @TODO add drag-active animation
      <MatterItem
        style={{ marginBottom: 12 }}
        matter={item}
        onStartPress={() => {
          console.log(item);
        }}
        onLongPress={drag}
      ></MatterItem>
    );
  };

  return (
    <View style={styles.page}>
      <DraggableFlatList
        data={matters}
        keyExtractor={(matter) => "matter-" + matter.matterId}
        renderItem={renderMatterItem}
        onDragEnd={({ data }) => {
          setMatters(data);
        }}
      ></DraggableFlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
});
