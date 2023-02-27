import {
  GestureResponderEvent,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { COLOR_BLACK } from "../styles/const";
import { WithReactNativeStyleProps } from ".";

export interface IconButtonProps extends WithReactNativeStyleProps {
  iconName: string;
  iconSize?: number;
  iconColor?: string;
  size?: number;
  backgroundColor?: string;
  onPress: (e: GestureResponderEvent) => void;
  bias?: number;
}

export default function IconButton({
  style,
  iconName,
  iconSize,
  iconColor,
  size,
  backgroundColor,
  onPress,
  bias,
}: IconButtonProps) {
  if (!iconColor) iconColor = COLOR_BLACK;
  if (!iconSize) iconSize = 24;
  if (!size) size = 36;
  if (!backgroundColor) backgroundColor = "transparent";
  // some icon may seem small and down
  if (!bias) bias = 0;

  return (
    <TouchableOpacity
      style={[styles.button, ...(style ?? [])]}
      onPress={onPress}
      activeOpacity={0.6}
    >
      {/* @FIX how to get Generics Type ??? */}
      <MaterialIcons
        name={iconName as any}
        color={iconColor}
        size={iconSize}
        style={{ marginBottom: bias }}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
});
