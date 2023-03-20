import { View, StyleSheet, Pressable } from "react-native";
import { useShowBottomModal } from "../../ui/BottomModal";
import { color, ColorList } from "../../modules/color";
import { atom, useAtom } from "jotai";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { COLOR_WHITE } from "../../styles/const";

export function useColorSelect(): [number, () => void] {
  const [showBottomModal, _] = useShowBottomModal();
  const [color] = useAtom(ColorSelectStore.selectedColor);
  return [color, () => showBottomModal(<ColorSelectContent />, "选择颜色")];
}

const ColorSelectStore = {
  selectedColor: atom(0),
};

function ColorSelectContent() {
  const [selectedColor, setSelectedColor] = useAtom(
    ColorSelectStore.selectedColor
  );

  return (
    <View style={styles.container}>
      {ColorList.map((color, index) => (
        <Pressable
          key={`color-select-${index}`}
          style={[
            styles.item,
            {
              backgroundColor: color,
            },
          ]}
          onPress={() => {
            setSelectedColor(index);
          }}
        >
          {selectedColor === index ? (
            <MaterialIcons
              name="check"
              size={20}
              color={COLOR_WHITE}
            ></MaterialIcons>
          ) : null}
        </Pressable>
      ))}
    </View>
  );
}

const colorItemSize = 40;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  item: {
    width: colorItemSize,
    height: colorItemSize,
    borderRadius: 4,
    margin: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});
