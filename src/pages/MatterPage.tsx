import { View, StyleSheet, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { WithHeaderNavigationProp } from "../routes/type";

export default function MatterPage() {
  const navigation = useNavigation<WithHeaderNavigationProp>();

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
