import { View, StyleSheet, Text, Button } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { WithHeaderNavigationProp } from "../routes/type";
import { useSetAtom } from "jotai/react";
import { HeaderStore } from "../store";
import { HEADER_TITLE_MATTER } from "../utils/text";
import { useEffect, useState } from "react";
import { DA } from "../data";
import { Matter } from "../data/matter";

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

  /**
   * matters
   */
  const [matters, setMatters] = useState<Matter[]>([]);
  useEffect(() => {
    DA()
      .getAllMatter()
      .then((res) => setMatters(res));
  }, []);

  return (
    <View>
      <Text>Matter</Text>
      <Button
        title="Matter Edit"
        onPress={() => navigation.navigate("MatterEdit")}
      ></Button>
      {matters.map((matter) => (
        <Text key={"matter-" + matter.matterId}>{JSON.stringify(matter)}</Text>
      ))}
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
