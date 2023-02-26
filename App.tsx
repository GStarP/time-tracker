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

const WithHeader = createNativeStackNavigator();
const WithFooter = createNativeStackNavigator();

function FirstView() {
  return (
    <View style={styles.firstView}>
      <WithFooter.Navigator screenOptions={commonScreenOptions}>
        <WithFooter.Screen name="Matter" component={MatterPage} />
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
        <>
          <Header></Header>
          <NavigationContainer>
            <WithHeader.Navigator screenOptions={commonScreenOptions}>
              <WithHeader.Screen name="FirstView" component={FirstView} />
              <WithHeader.Screen name="MatterEdit" component={MatterEditPage} />
            </WithHeader.Navigator>
          </NavigationContainer>
        </>
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
