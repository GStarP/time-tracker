import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NavigatorScreenParams } from "@react-navigation/native";
import { Matter } from "../data/matter";

/**
 * route name
 */
export const FIRST_VIEW_PAGE_NAME = "FirstView";
export const MATTER_EDIT_PAGE_NAME = "MatterEdit";
export const TIMER_CREATE_PAGE_NAME = "TimerCreate";
export const RECORD_EDIT_PAGE_NAME = "RecordEdit";
export const TARGET_EDIT_PAGE_NAME = "TargetEdit";
export const TIMER_PAGE_NAME = "Timer";

export const MATTER_OR_TARGET_PAGE_NAME = "MatterOrTarget";
export const RECORD_PAGE_NAME = "Record";
export const STATS_PAGE_NAME = "Stats";
export const SETTING_PAGE_NAME = "Setting";

export const MATTER_PAGE_NAME = "Matter";
export const TARGET_PAGE_NAME = "Target";

/**
 * router type
 */
export type MainRouterNavigationProp = NativeStackNavigationProp<{
  [FIRST_VIEW_PAGE_NAME]: NavigatorScreenParams<WithFooterRouteList>;
  [TIMER_CREATE_PAGE_NAME]: undefined;
  [MATTER_EDIT_PAGE_NAME]: CreateOrEdit<Matter>;
  [RECORD_EDIT_PAGE_NAME]: CreateOrEdit<unknown>;
  [TARGET_EDIT_PAGE_NAME]: CreateOrEdit<unknown>;
  [TIMER_PAGE_NAME]: undefined;
}>;

export type WithFooterRouteList = {
  [MATTER_OR_TARGET_PAGE_NAME]:
    | NavigatorScreenParams<MatterOrTargetRouteList>
    | undefined;
  [RECORD_PAGE_NAME]: undefined;
  [STATS_PAGE_NAME]: undefined;
  [SETTING_PAGE_NAME]: undefined;
};

export type MatterOrTargetRouteList = {
  [MATTER_PAGE_NAME]: undefined;
  [TARGET_PAGE_NAME]: undefined;
};

/**
 * route param
 */
export interface CreateOrEdit<T> {
  isEdit: boolean;
  data?: T;
}
export type EditPageParam = {
  [MATTER_EDIT_PAGE_NAME]: CreateOrEdit<Matter>;
  [RECORD_EDIT_PAGE_NAME]: CreateOrEdit<unknown>;
  [TARGET_EDIT_PAGE_NAME]: CreateOrEdit<unknown>;
};
