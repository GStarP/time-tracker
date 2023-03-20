import { View, StyleSheet, Text } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import {
  MATTER_EDIT_PAGE_NAME,
  MainRouterNavigationProp,
  FIRST_VIEW_PAGE_NAME,
  MATTER_OR_TARGET_PAGE_NAME,
  TARGET_PAGE_NAME,
} from "../routes/type";
import { useAtom, useSetAtom } from "jotai/react";
import { HEADER_TITLE_MATTER } from "../modules/text";
import { useEffect, useState, useMemo } from "react";
import { Matter } from "../data/matter";
import { FooterState, FooterStore } from "../store";
import IconButton from "../ui/IconButton";
import { COLOR_HINT, COLOR_WHITE, GlobalStyle } from "../styles/const";
import { HeaderStore } from "../store/header";
import MatterItem from "../components/matter/MatterItem";
import DraggableFlatList, {
  DragEndParams,
  RenderItemParams,
} from "react-native-draggable-flatlist";
import { MatterStore } from "../store/matter";
import { updateSortNum } from "../modules/matter/sort";
import { useMatterItemOperation } from "../components/matter/MatterItemOperation";
import { errorDialogOptions, useDialog } from "../ui/Dialog";
import { EMPTY_FUNC } from "../utils/const";
import { DA } from "../data";

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
  const [matters, setMatters] = useAtom(MatterStore.matters);

  const showMatterItemOperation = useMatterItemOperation();

  const toEditPage = (matter: Matter) => {
    navigation.navigate(MATTER_EDIT_PAGE_NAME, {
      isEdit: true,
      data: matter,
    });
  };

  const [showDialog] = useDialog();
  const deleteMatter = (matter: Matter) => {
    showDialog({
      content: `是否确认删除事务 ${matter.matterName}？`,
    })
      .then(async () => {
        try {
          const dao = DA();
          await dao.deleteMatter(matter.matterId);
          setMatters(await dao.getAllMatter());
        } catch (e: any) {
          showDialog(errorDialogOptions(e));
        }
      })
      .catch(EMPTY_FUNC);
  };

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
        onPress={() =>
          showMatterItemOperation({
            onEdit: () => toEditPage(item),
            onDelete: () => deleteMatter(item),
          })
        }
      ></MatterItem>
    );
  };

  const onResort = ({ data, to }: DragEndParams<Matter>) => {
    updateSortNum(data, to);
    setMatters(data);
  };

  return (
    <View style={styles.page}>
      {matters.length === 0 ? (
        <View style={GlobalStyle.centeredView}>
          <Text style={{ fontSize: 24, color: COLOR_HINT }}>暂无事务</Text>
        </View>
      ) : (
        <DraggableFlatList
          data={matters}
          keyExtractor={(matter) => "matter-" + matter.matterId}
          renderItem={renderMatterItem}
          onDragEnd={onResort}
        ></DraggableFlatList>
      )}
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
