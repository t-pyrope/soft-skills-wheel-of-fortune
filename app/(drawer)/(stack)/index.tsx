import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Header } from "@/components/Header";
import WheelOfFortune from "@/components/WheelOfFortune";
import { i18n } from "@/i18n/config";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Header title={i18n.t("wheel.title")} />
      <WheelOfFortune />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
    padding: 20,
    paddingBottom: 40,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#faf3e8",
  },
});
