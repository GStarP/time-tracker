import { View, StyleSheet, Text, Button } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { WithHeaderNavigationProp } from "../routes/type";
import { useSetAtom } from "jotai/react";
import { HeaderStore } from "../store";
import { HEADER_TITLE_MATTER } from "../modules/text";

export default function MatterPage() {
  /**
   * navigation
   */
  const navigation = useNavigation<WithHeaderNavigationProp>();
  const setHeaderTitle = useSetAtom(HeaderStore.title);
  const setHeaderActions = useSetAtom(HeaderStore.actions);
  useFocusEffect(() => {
    setHeaderTitle(HEADER_TITLE_MATTER);
    setHeaderActions(MatterPageHeaderActions);
  });

  return (
    <View>
      <Text>Matter</Text>
      <Button
        title="Matter Edit"
        onPress={() => navigation.navigate("MatterEdit")}
      ></Button>
    </View>
  );
}

function MatterPageHeaderActions() {
  return (
    <View>
      <Text>No Actions</Text>
    </View>
  );
}
