import { View } from "react-native";

import WheelOfFortune from "@/components/WheelOfFortune";
import { Header } from "@/components/Header";

export default function HomeScreen() {
  return (
    <View>
      <Header />
      <WheelOfFortune />
    </View>
  );
}
