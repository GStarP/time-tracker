import { GestureResponderEvent, ViewStyle } from "react-native";

export type OnPressCallback = (e: GestureResponderEvent) => void;
export interface WithOnPressProps {
  onPress?: OnPressCallback;
}
