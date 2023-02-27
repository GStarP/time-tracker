import { View, StyleSheet, Text, Button } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { WithHeaderNavigationProp } from "../routes/type";
import { useSetAtom } from "jotai/react";
import { HeaderStore } from "../store";
import { HEADER_TITLE_MATTER } from "../utils/text";
import { useEffect, useState } from "react";
import { DA } from "../data";
import { Matter } from "../data/matter";
import { FooterState, FooterStore } from "../store/footer";

export default function MatterPage() {
  /**
   * navigation
   */
  const navigation = useNavigation<WithHeaderNavigationProp>();

  /**
   * set header options
   */
  const setHeaderShowBack = useSetAtom(HeaderStore.showBack);
  const setHeaderTitle = useSetAtom(HeaderStore.title);
  useFocusEffect(() => {
    setHeaderShowBack(false);
    setHeaderTitle(HEADER_TITLE_MATTER);
  });
  /**
   * set footer options
   */
  const setFooterState = useSetAtom(FooterStore.state);
  useFocusEffect(() => {
    setFooterState(FooterState.MATTER);
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
