import { View, StyleSheet, Text, Button } from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { EditPageParam, MainRouterNavigationProp } from "../routes/type";
import {
  HEADER_TITLE_RECORD_CREATE,
  HEADER_TITLE_RECORD_EDIT,
} from "../utils/text";
import Header from "../components/Header";
import IconButton from "../ui/IconButton";
import { useMemo } from "react";
import { COLOR_WHITE } from "../styles/const";

export default function RecordEditPage() {
  /**
   * navigation
   */
  const navigation = useNavigation<MainRouterNavigationProp>();
  const route = useRoute<RouteProp<EditPageParam, "RecordEdit">>();
  const isEdit = route.params?.isEdit ?? false;

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
        title={isEdit ? HEADER_TITLE_RECORD_EDIT : HEADER_TITLE_RECORD_CREATE}
        showBack={true}
        actions={HeaderActions}
      ></Header>
      <View>
        <Text>Record Edit</Text>
      </View>
    </>
  );
}
