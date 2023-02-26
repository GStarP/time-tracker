import { View, StyleSheet, Text, Button } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { WithHeaderNavigationProp } from "../routes/type";
import { useSetAtom } from "jotai/react";
import { HeaderStore } from "../store";
import { HEADER_TITLE_MATTER_CREATE } from "../utils/text";

export default function MatterEditPage() {
  /**
   * navigation
   */
  const navigation = useNavigation<WithHeaderNavigationProp>();
  const setHeaderTitle = useSetAtom(HeaderStore.title);
  const setHeaderActions = useSetAtom(HeaderStore.actions);
  useFocusEffect(() => {
    setHeaderTitle(HEADER_TITLE_MATTER_CREATE);
    setHeaderActions(MatterEditPageHeaderActions);
  });

  return (
    <View>
      <Text>Matter Edit</Text>
      <Button
        title="Matter"
        onPress={() => navigation.navigate("FirstView", { screen: "Matter" })}
      ></Button>
    </View>
  );
}

function MatterEditPageHeaderActions() {
  return (
    <View>
      <Button title="Close"></Button>
    </View>
  );
}
