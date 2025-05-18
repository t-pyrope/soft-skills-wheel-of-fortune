import { StyleSheet } from "react-native";

import { Header } from "@/components/Header";
import { ThemedSafeAreaView } from "@/components/ui/ThemedSafeAreaView";
import WheelOfFortune from "@/components/wheel/WheelOfFortune";
import { i18n } from "@/i18n/config";

export default function HomeScreen() {
  return (
    <ThemedSafeAreaView style={styles.container}>
      <Header title={i18n.t("wheel.title")} />
      <WheelOfFortune />
    </ThemedSafeAreaView>
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
  },
});
