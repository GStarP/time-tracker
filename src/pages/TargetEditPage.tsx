import { View, StyleSheet, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MainRouterNavigationProp } from "../routes/type";
import { HEADER_TITLE_TARGET_CREATE } from "../utils/text";
import Header from "../components/Header";
import IconButton from "../ui/IconButton";
import { useMemo } from "react";
import { COLOR_WHITE } from "../styles/const";

export default function TargetEditPage() {
  /**
   * navigation
   */
  const navigation = useNavigation<MainRouterNavigationProp>();

  /**
   * Header
   */
  const HeaderActions = useMemo(() => {
    return (
      <IconButton
        iconName="check"
        iconColor={COLOR_WHITE}
        // @TODO
        onPress={() => navigation.goBack()}
      ></IconButton>
    );
  }, []);

  return (
    <>
      <Header
        title={HEADER_TITLE_TARGET_CREATE}
        showBack={true}
        actions={HeaderActions}
      ></Header>
      <View>
        <Text>Target Edit</Text>
      </View>
    </>
  );
}
