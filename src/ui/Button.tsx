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
  color?: string;
  onPress?: () => void;
}
const DEFAULT_PROPS = {
  color: COLOR_BLACK,
};

export default function Button(props: ButtonProps) {
  const { label, color, onPress } = { ...DEFAULT_PROPS, ...props };

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
        style={styles.container}
        onPress={onPress}
        onPressIn={pressInHandler}
        onPressOut={pressOutHandler}
      >
        <Text style={[styles.label, { color }]}>{label}</Text>
        <MaterialIcons
          style={{ marginLeft: "auto" }}
          name="arrow-forward-ios"
          size={16}
        ></MaterialIcons>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 64,
    paddingHorizontal: 24,
  },
  label: {
    fontSize: 16,
  },
});
