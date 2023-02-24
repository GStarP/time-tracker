import { View, StyleSheet, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { WithHeaderNavigationProp } from "../routes/type";

export default function MatterEditPage() {
  const navigation = useNavigation<WithHeaderNavigationProp>();
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
