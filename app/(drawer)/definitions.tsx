import { FlatList, StyleSheet, View } from "react-native";
import { Header } from "@/components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import { DEFINITIONS } from "@/constants/softSkills";
import { i18n } from "@/i18n/config";

const Item = ({
  title,
  definition,
  index,
}: {
  title: string;
  definition: string;
  index: number;
}) => (
  <View style={styles.item}>
    <ThemedText type="subtitle" style={styles.subtitle}>
      {index}. {title}
    </ThemedText>
    <ThemedText>{definition}</ThemedText>
  </View>
);

export default function Definitions() {
  return (
    <SafeAreaView style={styles.container}>
      <Header title={i18n.t("definitions.title")} />
      <FlatList
        data={DEFINITIONS}
        renderItem={({ item }) => <Item {...item} />}
        keyExtractor={(item) => item.title}
      />
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
  item: {
    marginVertical: 8,
    marginHorizontal: 16,
  },
  subtitle: {
    marginBlockEnd: 8,
  },
});
