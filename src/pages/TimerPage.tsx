import { View, StyleSheet, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  FIRST_VIEW_PAGE_NAME,
  MainRouterNavigationProp,
  MATTER_OR_TARGET_PAGE_NAME,
} from "../routes/type";
import { HEADER_TITLE_TIMER } from "../modules/text";
import Header from "../components/Header";

export default function TimerPage() {
  /**
   * navigation
   */
  const navigation = useNavigation<MainRouterNavigationProp>();

  return (
    <>
      <Header title={HEADER_TITLE_TIMER}></Header>
      <View>
        <Text>Timer</Text>
        <Button
          title="结束计时"
          onPress={() =>
            navigation.navigate(FIRST_VIEW_PAGE_NAME, {
              screen: MATTER_OR_TARGET_PAGE_NAME,
            })
          }
        />
      </View>
    </>
  );
}
