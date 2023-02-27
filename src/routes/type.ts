import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NavigatorScreenParams } from "@react-navigation/native";

/**
 * route name
 */
export const FIRST_VIEW_PAGE_NAME = "FirstView";
export const MATTER_EDIT_PAGE_NAME = "MatterEdit";
export const TIMER_CREATE_PAGE_NAME = "TimerCreate";

export const MATTER_PAGE_NAME = "Matter";
export const RECORD_PAGE_NAME = "Record";
export const STATS_PAGE_NAME = "Stats";
export const SETTING_PAGE_NAME = "Setting";

/**
 * router type
 */
export type WithHeaderNavigationProp = NativeStackNavigationProp<{
  [FIRST_VIEW_PAGE_NAME]: NavigatorScreenParams<WithFooterRouteList>;
  [MATTER_EDIT_PAGE_NAME]: undefined;
  [TIMER_CREATE_PAGE_NAME]: undefined;
}>;

export type WithFooterRouteList = {
  [MATTER_PAGE_NAME]: undefined;
  [RECORD_PAGE_NAME]: undefined;
  [STATS_PAGE_NAME]: undefined;
  [SETTING_PAGE_NAME]: undefined;
};
