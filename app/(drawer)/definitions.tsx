import { StyleSheet } from "react-native";
import { Header } from "@/components/Header";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Definitions() {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
    position: 'static',
  },
  inner: {
    padding: 10,
  },
  link: {
    textDecorationLine: 'underline',
    color: '',
  },
  title: {
    fontSize: 18,
  },
});