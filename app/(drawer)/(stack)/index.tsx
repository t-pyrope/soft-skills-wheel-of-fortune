import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Header } from "@/components/Header";
import { ThemedText } from "@/components/ThemedText";
import WheelOfFortune from "@/components/WheelOfFortune";
import { i18n } from "@/i18n/config";
import { useAppContext } from "@/contexts/AppContext";

export default function HomeScreen() {
  const { limit } = useAppContext();

  return (
    <SafeAreaView style={styles.container}>
      <Header title={i18n.t("wheel.title")} />
      <WheelOfFortune />
      <ThemedText>{i18n.t("wheel.spinsLeft", { limit })}</ThemedText>
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
