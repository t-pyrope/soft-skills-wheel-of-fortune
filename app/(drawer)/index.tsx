import { SafeAreaView } from "react-native-safe-area-context";

import WheelOfFortune from "@/components/WheelOfFortune";
import { Header } from "@/components/Header";

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <Header title="Soft skills wheel of fortune" />
      <WheelOfFortune />
    </SafeAreaView>
  );
}
