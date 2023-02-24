import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NavigatorScreenParams } from "@react-navigation/native";

export type WithHeaderNavigationProp = NativeStackNavigationProp<{
  FirstView: NavigatorScreenParams<WithFooterRouteList>;
  MatterEdit: undefined;
}>;

export type WithFooterRouteList = {
  Matter: undefined;
};
