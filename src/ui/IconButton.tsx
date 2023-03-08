import { Pressable, StyleSheet, View, Animated, Easing } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { COLOR_BLACK } from "../styles/const";
import { WithOnPressProps } from ".";
import React, { useCallback, useRef } from "react";

export interface IconButtonProps
  extends React.ComponentProps<typeof View>,
    WithOnPressProps {
  iconName: string;
  iconSize?: number;
  iconColor?: string;
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
      duration: 100,
      easing: Easing.linear,
      // @FIX if set to true, animation will disappear
      useNativeDriver: false,
    }).start();
  }, []);
  const onPressOut = useCallback(() => {
    // @ATTENTION promise onPressIn animation finish
    // especially during short click
    setTimeout(() => {
      Animated.timing(animateBackgroundColor.current, {
        toValue: 0,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    }, 100);
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
        style,
      ]}
    >
      <Pressable
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onPress={onPress}
      >
        {/* @FIX material icon name type */}
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
