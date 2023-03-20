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
  const data = route.params?.data;

  /**
   * create/edit matter
   */
  const matterName = useRef(data?.matterName || "");
  const [iconColorCode, showIconColorSelect] = useColorSelect(
    data?.matterColor
  );
  const [iconCode, showIconSelect] = useIconSelect(data?.matterIcon);

  /**
   * confirm
   */
  const [showDialog] = useDialog();
  const [matters, setMatters] = useAtom(MatterStore.matters);
  const onConfirm = async () => {
    if (matterName.current === "") {
      showDialog({
        content: "事务名称不能为空",
        cancelText: "",
      });
      return;
    }

    const dao = DA();
    try {
      if (isEdit) {
        await dao.updateMatter({
          ...data!,
          matterName: matterName.current,
          matterColor: iconColorCode,
          matterIcon: iconCode,
        });
      } else {
        await dao.insertMatter({
          matterId: -1,
          matterName: matterName.current,
          matterIcon: iconCode,
          matterColor: iconColorCode,
          sortNum: getNewMatterSortNum(matters),
        });
      }
    } catch (e: any) {
      showDialog(errorDialogOptions(e));
    }

    setMatters(await dao.getAllMatter());
    navigation.goBack();
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
            name={icon(iconCode) as any}
            color={color(iconColorCode)}
            size={24}
          />
          <TextInput
            defaultValue={matterName.current}
            style={{ fontSize: 16 }}
            placeholder="点击输入事务名称"
            placeholderTextColor={COLOR_HINT}
            cursorColor={COLOR_BLACK}
            onChangeText={(text) => (matterName.current = text)}
          ></TextInput>
        </View>

        <Button label="更换颜色" onPress={showIconColorSelect}></Button>
        <Button label="更换图标" onPress={showIconSelect}></Button>
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
