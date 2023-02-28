import { View, StyleSheet, Text, Button } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { WithHeaderNavigationProp } from "../routes/type";
import { useSetAtom } from "jotai/react";
import { HEADER_TITLE_MATTER } from "../utils/text";
import { useEffect, useState } from "react";
import { DA } from "../data";
import { Matter } from "../data/matter";
import { FooterState, FooterStore } from "../store/footer";
import Header from "../components/Header";

export default function MatterPage() {
  /**
   * navigation
   */
  const navigation = useNavigation<WithHeaderNavigationProp>();

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
    <>
      <Header title={HEADER_TITLE_MATTER}></Header>
      <View>
        <Text>Matter</Text>
        <Button
          title="Matter Edit"
          onPress={() => navigation.navigate("MatterEdit")}
        ></Button>
        {matters.map((matter) => (
          <Text key={"matter-" + matter.matterId}>
            {JSON.stringify(matter)}
          </Text>
        ))}
      </View>
    </>
  );
}
