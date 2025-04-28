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
  source,
}: {
  title: string;
  definition: string;
  index: number;
  source: string;
}) => (
  <View style={styles.item}>
    <ThemedText type="subtitle" style={styles.subtitle}>
      {index}. {title}
    </ThemedText>
    <ThemedText>{definition}</ThemedText>
    {source && (
      <ThemedText style={styles.source}>
        {i18n.t("definitions.source")}: {source}
      </ThemedText>
    )}
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
    backgroundColor: "#faf3e8",
  },
  item: {
    marginVertical: 8,
    marginHorizontal: 16,
  },
  subtitle: {
    marginBlockEnd: 8,
  },
  source: {
    opacity: 0.8,
    fontSize: 15,
  },
});
