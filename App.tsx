import { StyleSheet, Text, View, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from "./src/components/Header";
import Footer from "./src/components/Footer";
import MatterEditPage from "./src/pages/MatterEditPage";
import MatterPage from "./src/pages/MatterPage";
import { commonScreenOptions } from "./src/routes";
import { useState, useEffect } from "react";
import { useSqliteDataAccess } from "./src/data";
import {
  FIRST_VIEW_PAGE_NAME,
  MATTER_EDIT_PAGE_NAME,
  MATTER_PAGE_NAME,
  RECORD_PAGE_NAME,
  SETTING_PAGE_NAME,
  STATS_PAGE_NAME,
  TIMER_CREATE_PAGE_NAME,
} from "./src/routes/type";
import RecordPage from "./src/pages/RecordPage";
import StatsPage from "./src/pages/StatsPage";
import SettingPage from "./src/pages/SettingPage";
import TimerCreatePage from "./src/pages/TimerCreatePage";

const WithHeader = createNativeStackNavigator();
const WithFooter = createNativeStackNavigator();

function FirstView() {
  return (
    <View style={styles.firstView}>
      <WithFooter.Navigator screenOptions={commonScreenOptions}>
        <WithFooter.Screen name={MATTER_PAGE_NAME} component={MatterPage} />
        <WithFooter.Screen name={RECORD_PAGE_NAME} component={RecordPage} />
        <WithFooter.Screen name={STATS_PAGE_NAME} component={StatsPage} />
        <WithFooter.Screen name={SETTING_PAGE_NAME} component={SettingPage} />
      </WithFooter.Navigator>
      <Footer></Footer>
    </View>
  );
}

export default function App() {
  /**
   * init operations
   */
  const [ready, setReady] = useState(false);
  useEffect(() => {
    // @FIX may need cleanup?
    useSqliteDataAccess().then(() => {
      setReady(true);
    });
  }, []);

  return (
    <View style={styles.app}>
      {/* @FIX if use expo StatusBar, app will ignore StatusBar space */}
      <StatusBar></StatusBar>
      {ready ? (
        <NavigationContainer>
          <WithHeader.Navigator
            screenOptions={{
              ...commonScreenOptions,
              animation: "slide_from_bottom",
            }}
          >
            <WithHeader.Screen
              name={FIRST_VIEW_PAGE_NAME}
              component={FirstView}
            />
            <WithHeader.Screen
              name={MATTER_EDIT_PAGE_NAME}
              component={MatterEditPage}
            />
            <WithHeader.Screen
              name={TIMER_CREATE_PAGE_NAME}
              component={TimerCreatePage}
            />
          </WithHeader.Navigator>
        </NavigationContainer>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
  },
  firstView: {
    flex: 1,
  },
});
