import { View, StyleSheet, Pressable } from "react-native";
import { useShowBottomModal } from "../../ui/BottomModal";
import { atom, useAtom } from "jotai";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  COLOR_BLACK,
  COLOR_LIGHT_BACKGROUND,
  COLOR_WHITE,
} from "../../styles/const";
import { icon, IconList } from "../../utils/icon";
import Ionicons from "@expo/vector-icons/Ionicons";

export function useIconSelect(): [number, () => void] {
  const [showBottomModal, _] = useShowBottomModal();
  const [icon] = useAtom(IconSelectStore.selectedIcon);
  return [icon, () => showBottomModal(<IconSelectContent />, "选择图标")];
}

const IconSelectStore = {
  selectedIcon: atom(0),
};

function IconSelectContent() {
  const [selectedIcon, setSelectedIcon] = useAtom(IconSelectStore.selectedIcon);

  return (
    <View style={styles.container}>
      {IconList.map((icon, index) => (
        <Pressable
          key={`icon-select-${index}`}
          style={[
            styles.item,
            {
              borderWidth: selectedIcon === index ? 2 : 0,
            },
          ]}
          onPress={() => {
            setSelectedIcon(index);
          }}
        >
          <Ionicons size={24} color={COLOR_BLACK} name={icon as any}></Ionicons>
        </Pressable>
      ))}
    </View>
  );
}

const iconItemSize = 40;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  item: {
    width: iconItemSize,
    height: iconItemSize,
    borderRadius: 4,
    margin: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLOR_LIGHT_BACKGROUND,
  },
});
