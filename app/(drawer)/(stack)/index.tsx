import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import WheelOfFortune from "@/components/WheelOfFortune";
import { Header } from "@/components/Header";
import { i18n } from "@/i18n/config";
import { app } from "@/firebaseConfig";

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
    justifyContent: "center",
    alignItems: "center",
  },
});
