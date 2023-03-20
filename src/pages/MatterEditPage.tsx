import { View, TextInput, StyleSheet } from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { EditPageParam, MainRouterNavigationProp } from "../routes/type";
import {
  HEADER_TITLE_MATTER_CREATE,
  HEADER_TITLE_MATTER_EDIT,
} from "../modules/text";
import Header from "../components/Header";
import IconButton from "../ui/IconButton";
import { useRef } from "react";
import { COLOR_BLACK, COLOR_HINT, COLOR_WHITE } from "../styles/const";
import Button from "../ui/Button";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useColorSelect } from "../components/matter-edit/ColorSelect";
import { useIconSelect } from "../components/matter-edit/IconSelect";
import { errorDialogOptions, useDialog } from "../ui/Dialog";
import { DA } from "../data";
import { color } from "../modules/color";
import { icon } from "../modules/icon";
import { useAtom } from "jotai";
import { MatterStore } from "../store/matter";
import { getNewMatterSortNum } from "../modules/matter/sort";

export default function MatterEditPage() {
  /**
   * navigation
   */
  const navigation = useNavigation<MainRouterNavigationProp>();
  const route = useRoute<RouteProp<EditPageParam, "MatterEdit">>();
  const isEdit = route.params?.isEdit ?? false;

  /**
   * create/edit matter
   */
  const matterName = useRef("");
  const [iconColor, showIconColorSelect] = useColorSelect();
  const [iconName, showIconNameSelect] = useIconSelect();

  /**
   * confirm
   */
  const [showDialog] = useDialog();
  const [matters, setMatters] = useAtom(MatterStore.matters);
  const onConfirm = () => {
    if (isEdit) {
      showDialog({
        content: "尚未实现",
        confirmText: "",
      });
    } else {
      if (matterName.current === "") {
        showDialog({
          content: "事务名称不能为空",
          cancelText: "",
        });
        return;
      }

      showDialog({
        content: "是否确认新建事务",
      })
        .then(async () => {
          try {
            const sortNum = getNewMatterSortNum(matters);

            const dao = DA();
            dao.insertMatter({
              matterId: -1,
              matterName: matterName.current,
              matterIcon: iconName,
              matterColor: iconColor,
              sortNum,
            });

            // after insert, update immediately
            // after update, insert complete
            const newMatters = await dao.getAllMatter();
            setMatters(newMatters);

            navigation.goBack();
          } catch (e: any) {
            showDialog(errorDialogOptions(e));
          }
        })
        .catch((e) => {});
    }
  };

  /**
   * Header
   */
  const HeaderActions = (
    <IconButton
      iconName="check"
      iconColor={COLOR_WHITE}
      onPress={onConfirm}
    ></IconButton>
  );

  return (
    <>
      <Header
        title={isEdit ? HEADER_TITLE_MATTER_EDIT : HEADER_TITLE_MATTER_CREATE}
        showBack={true}
        actions={HeaderActions}
      ></Header>
      <View style={{ paddingVertical: 24 }}>
        {/* matter-item preview */}
        <View
          style={[styles.matter, { marginHorizontal: 24, marginBottom: 24 }]}
        >
          <Ionicons
            style={{ marginRight: 16 }}
            name={icon(iconName) as any}
            color={color(iconColor)}
            size={24}
          />
          <TextInput
            style={{ fontSize: 16 }}
            placeholder="点击输入事务名称"
            placeholderTextColor={COLOR_HINT}
            cursorColor={COLOR_BLACK}
            onChangeText={(text) => (matterName.current = text)}
          ></TextInput>
        </View>

        <Button label="更换颜色" onPress={showIconColorSelect}></Button>
        <Button label="更换图标" onPress={showIconNameSelect}></Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  matter: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    height: 72,
    borderRadius: 4,
    backgroundColor: COLOR_WHITE,
    elevation: 2,
  },
});
