import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  View,
  Animated,
  Easing,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { COLOR_BLACK } from "../styles/const";
import { WithReactNativeStyleProps } from ".";
import { useCallback, useRef } from "react";

export interface IconButtonProps extends WithReactNativeStyleProps {
  iconName: string;
  iconSize?: number;
  iconColor?: string;
  backgroundColor?: string;
  onPress: (e: GestureResponderEvent) => void;
}

export default function IconButton({
  style,
  iconName,
  iconSize,
  iconColor,
  onPress,
}: IconButtonProps) {
  if (!iconColor) iconColor = COLOR_BLACK;
  if (!iconSize) iconSize = 24;

  // padding: 16px
  const size = iconSize + 16;
  const computedStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
  };

  // background-color animation when pressed
  const animateBackgroundColor = useRef(new Animated.Value(0));
  const onPressIn = useCallback(() => {
    Animated.timing(animateBackgroundColor.current, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, []);
  const onPressOut = useCallback(() => {
    // @ATTENTION promise onPressIn finish, especially when sudden click
    setTimeout(() => {
      Animated.timing(animateBackgroundColor.current, {
        toValue: 0,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    }, 200);
  }, []);

  return (
    <Animated.View
      style={[
        styles.button,
        computedStyle,
        {
          backgroundColor: animateBackgroundColor.current.interpolate({
            inputRange: [0, 1],
            outputRange: ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.1)"],
          }),
        },
        ...(style ?? []),
      ]}
    >
      <Pressable
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onPress={onPress}
      >
        {/* @FIX how to get Generics Type ??? */}
        <MaterialIcons
          name={iconName as any}
          color={iconColor}
          size={iconSize}
        />
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
});
