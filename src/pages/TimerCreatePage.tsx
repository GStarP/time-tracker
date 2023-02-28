import { View, Text } from "react-native";
import { HEADER_TIMER_CREATE_PAGE } from "../utils/text";
import Header from "../components/Header";

export default function TimerCreatePage() {
  return (
    <>
      <Header title={HEADER_TIMER_CREATE_PAGE}></Header>
      <View>
        <Text>Timer Create</Text>
      </View>
    </>
  );
}
