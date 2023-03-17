import { StyleSheet, Text, View, StatusBar } from "react-native";
import { useState, useEffect } from "react";
import { DA, useSqliteDataAccess } from "./src/data";
import { RouterView } from "./src/routes";
import BottomModal from "./src/ui/BottomModal";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Dialog } from "./src/ui/Dialog";
import { useSetAtom } from "jotai";
import { MatterStore } from "./src/store/matter";

export default function App() {
  /**
   * init operations
   */
  const [ready, setReady] = useState(false);

  const setMatters = useSetAtom(MatterStore.matters);

  useEffect(() => {
    // @FIX may need cleanup?
    useSqliteDataAccess().then(async (dao) => {
      try {
        // fetch matters
        const matters = await dao.getAllMatter();
        setMatters(matters);
        setReady(true);
      } catch (e) {
        console.error("app initialize failed", e);
      }
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
      <Dialog />
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
  },
});
