import React from "react";
import { Pressable, Text, StyleSheet, View } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { COLOR_BLACK, COLOR_BLUR, COLOR_FOCUS } from "../styles/const";

interface TextButtonProps extends React.ComponentProps<typeof View> {
  label: string;
  onPress: () => void;
  color?: string;
}

const DEFAULT_PROPS = {
  color: COLOR_BLACK,
};

export default function TextButton(props: TextButtonProps) {
  const { label, onPress, color, style } = { ...DEFAULT_PROPS, ...props };

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
    <Animated.View style={[styles.container, backgroundAnimatedStyle, style]}>
      <Pressable
        onPress={onPress}
        onPressIn={pressInHandler}
        onPressOut={pressOutHandler}
      >
        <Text style={{ color }}>{label}</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
  },
});
