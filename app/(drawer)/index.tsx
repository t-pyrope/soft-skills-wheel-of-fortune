import { SafeAreaView } from "react-native-safe-area-context";

import WheelOfFortune from "@/components/WheelOfFortune";
import { Header } from "@/components/Header";
import { StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Soft skills wheel of fortune" />
      <WheelOfFortune />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    gap: 8,
    position: "static",
    padding: 20,
    paddingBottom: 40,
  },
});
