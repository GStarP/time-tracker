import { View, StyleSheet, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { WithHeaderNavigationProp } from "../routes/type";
import { HEADER_TITLE_MATTER_CREATE } from "../utils/text";
import Header from "../components/Header";

export default function MatterEditPage() {
  /**
   * navigation
   */
  const navigation = useNavigation<WithHeaderNavigationProp>();

  return (
    <>
      <Header title={HEADER_TITLE_MATTER_CREATE} showBack={true}></Header>
      <View>
        <Text>Matter Edit</Text>
        <Button
          title="Matter"
          onPress={() => navigation.navigate("FirstView", { screen: "Matter" })}
        ></Button>
      </View>
    </>
  );
}
