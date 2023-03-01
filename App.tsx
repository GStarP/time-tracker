import { StyleSheet, Text, View, StatusBar } from "react-native";
import { useState, useEffect } from "react";
import { useSqliteDataAccess } from "./src/data";
import { RouterView } from "./src/routes";
import BottomModal from "./src/ui/BottomModal";

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
      {ready ? <RouterView /> : <Text>Loading...</Text>}
      <BottomModal />
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
  },
});
