import { Pressable, StyleSheet, Text, View } from "react-native";
import { COLOR_BLACK, COLOR_BLUR, COLOR_FOCUS } from "../styles/const";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface ButtonProps {
  label: string;
  icon?: string;
  color?: string;
  height?: number;
  fontSize?: number;
  showArrow?: boolean;
  onPress?: () => void;
}
const DEFAULT_PROPS = {
  color: COLOR_BLACK,
  height: 64,
  fontSize: 16,
  showArrow: true,
};

export default function Button(props: ButtonProps) {
  const { label, icon, color, height, fontSize, showArrow, onPress } = {
    ...DEFAULT_PROPS,
    ...props,
  };

  const backgroundValue = useSharedValue(0);
  const backgroundAnimatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        backgroundValue.value,
        [0, 1],
        [COLOR_BLUR, COLOR_FOCUS]
      ),
    };
  });
  const pressInHandler = () => {
    backgroundValue.value = withTiming(1, {
      duration: 200,
    });
  };
  const pressOutHandler = () => {
    backgroundValue.value = withTiming(0, {
      duration: 300,
    });
  };

  return (
    <Animated.View style={backgroundAnimatedStyle}>
      <Pressable
        style={[
          styles.container,
          {
            height,
          },
        ]}
        onPress={onPress}
        onPressIn={pressInHandler}
        onPressOut={pressOutHandler}
      >
        {icon ? (
          <MaterialIcons
            name={icon as any}
            style={{ marginRight: 24 }}
            color={color}
            size={16}
          ></MaterialIcons>
        ) : null}

        <Text style={[{ color, fontSize }]}>{label}</Text>

        {showArrow ? (
          <MaterialIcons
            style={{ marginLeft: "auto" }}
            name="arrow-forward-ios"
            size={16}
          ></MaterialIcons>
        ) : null}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
  },
});
