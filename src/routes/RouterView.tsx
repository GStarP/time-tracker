import { View, StyleSheet } from "react-native";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack/lib/typescript/src/types";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import {
  FIRST_VIEW_PAGE_NAME,
  MATTER_EDIT_PAGE_NAME,
  MATTER_OR_TARGET_PAGE_NAME,
  MATTER_PAGE_NAME,
  RECORD_EDIT_PAGE_NAME,
  RECORD_PAGE_NAME,
  SETTING_PAGE_NAME,
  STATS_PAGE_NAME,
  TARGET_EDIT_PAGE_NAME,
  TARGET_PAGE_NAME,
  TIMER_CREATE_PAGE_NAME,
  TIMER_PAGE_NAME,
} from "./type";
import RecordPage from "../pages/RecordPage";
import StatsPage from "../pages/StatsPage";
import SettingPage from "../pages/SettingPage";
import TimerCreatePage from "../pages/TimerCreatePage";
import RecordEditPage from "../pages/RecordEditPage";
import TargetPage from "../pages/TargetPage";
import TargetEditPage from "../pages/TargetEditPage";
import TimerPage from "../pages/TimerPage";
import MatterPage from "../pages/MatterPage";
import Footer from "../components/Footer";
import MatterEditPage from "../pages/MatterEditPage";
import Header from "../components/Header";
import { useAtom } from "jotai";
import { HeaderStore } from "../store/header";

const MainRouter = createNativeStackNavigator();
const WithFooter = createNativeStackNavigator();
const MatterOrTarget = createNativeStackNavigator();

function MatterOrTargetPage() {
  return (
    <MatterOrTarget.Navigator screenOptions={commonScreenOptions}>
      <MatterOrTarget.Screen name={MATTER_PAGE_NAME} component={MatterPage} />
      <MatterOrTarget.Screen name={TARGET_PAGE_NAME} component={TargetPage} />
    </MatterOrTarget.Navigator>
  );
}

function FirstView() {
  const [headerTitle] = useAtom(HeaderStore.title);
  const [headerTitleAppend] = useAtom(HeaderStore.titleAppend);
  const [headerActions] = useAtom(HeaderStore.actions);

  return (
    <View style={{ flex: 1 }}>
      {/* First View must share header to avoid blink when switch page */}
      <Header
        title={headerTitle}
        titleAppend={headerTitleAppend}
        actions={headerActions}
      ></Header>
      <WithFooter.Navigator screenOptions={commonScreenOptions}>
        <WithFooter.Screen
          name={MATTER_OR_TARGET_PAGE_NAME}
          component={MatterOrTargetPage}
        />
        <WithFooter.Screen name={RECORD_PAGE_NAME} component={RecordPage} />
        <WithFooter.Screen name={STATS_PAGE_NAME} component={StatsPage} />
        <WithFooter.Screen name={SETTING_PAGE_NAME} component={SettingPage} />
      </WithFooter.Navigator>
      <Footer></Footer>
    </View>
  );
}

export default function RouterView() {
  return (
    <NavigationContainer>
      <MainRouter.Navigator
        screenOptions={{
          ...commonScreenOptions,
          animation: "slide_from_bottom",
        }}
      >
        <MainRouter.Screen name={FIRST_VIEW_PAGE_NAME} component={FirstView} />
        <MainRouter.Screen
          name={MATTER_EDIT_PAGE_NAME}
          component={MatterEditPage}
        />
        <MainRouter.Screen
          name={TIMER_CREATE_PAGE_NAME}
          component={TimerCreatePage}
        />
        <MainRouter.Screen
          name={RECORD_EDIT_PAGE_NAME}
          component={RecordEditPage}
        />
        <MainRouter.Screen
          name={TARGET_EDIT_PAGE_NAME}
          component={TargetEditPage}
        />
        <MainRouter.Screen name={TIMER_PAGE_NAME} component={TimerPage} />
      </MainRouter.Navigator>
    </NavigationContainer>
  );
}

const commonScreenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  animation: "fade",
  animationDuration: 200,
};
