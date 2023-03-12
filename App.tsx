import { StyleSheet, Text, View, StatusBar } from "react-native";
import { useState, useEffect } from "react";
import { useSqliteDataAccess } from "./src/data";
import { RouterView } from "./src/routes";
import BottomModal from "./src/ui/BottomModal";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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
      <StatusBar />
      <GestureHandlerRootView style={{ flex: 1 }}>
        {ready ? <RouterView /> : <Text>Loading...</Text>}
      </GestureHandlerRootView>
      <BottomModal />
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
  },
});
