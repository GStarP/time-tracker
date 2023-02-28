import { NativeStackNavigationOptions } from "@react-navigation/native-stack/lib/typescript/src/types";

export const commonScreenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  /* @FIX header seems flash when switch first-view */
  animation: "fade",
};
