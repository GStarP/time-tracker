import { View, Text } from "react-native";
import { HEADER_TIMER_CREATE_PAGE } from "../utils/text";
import Header from "../components/Header";
import { useMemo } from "react";
import IconButton from "../ui/IconButton";
import { COLOR_WHITE } from "../styles/const";
import { useNavigation } from "@react-navigation/native";
import { MainRouterNavigationProp, TIMER_PAGE_NAME } from "../routes/type";

export default function TimerCreatePage() {
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
        onPress={() => navigation.navigate(TIMER_PAGE_NAME)}
      ></IconButton>
    );
  }, []);
  return (
    <>
      <Header
        title={HEADER_TIMER_CREATE_PAGE}
        showBack={true}
        actions={HeaderActions}
      ></Header>
      <View>
        <Text>Timer Create</Text>
      </View>
    </>
  );
}
