import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Header } from "@/components/Header";
import { i18n } from "@/i18n/config";
import { useEffect, useState } from "react";
import { getSavedTaskIds } from "@/utils/getSavedTaskIds";
import { ThemedText } from "@/components/ThemedText";
import { ExtendedTask } from "@/types/Task";
import { ThemedView } from "@/components/ThemedView";

const OpenedTask = ({ task }: { task: ExtendedTask }) => {
  return (
    <ThemedView style={styles.taskItem}>
      <ThemedText>{task.text[i18n.locale as "en"]}</ThemedText>
    </ThemedView>
  );
};

export default function OpenedTasks() {
  const [openedTasks, setOpenedTasks] = useState<Array<ExtendedTask>>([]);
  const [loadingState, setLoadingState] = useState<"loading" | "loaded">(
    "loading",
  );

  useEffect(() => {
    const getTasks = async () => {
      try {
        const savedTasks = await getSavedTaskIds();

        setOpenedTasks(savedTasks);
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingState("loaded");
      }
    };

    getTasks();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header title={i18n.t("openedTasks.title")} />
      {loadingState === "loaded" && openedTasks.length === 0 && (
        <ThemedText>{i18n.t("openedTasks.noTasks")}</ThemedText>
      )}
      {openedTasks.map((task) => (
        <OpenedTask task={task} key={task.id} />
      ))}
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
  taskItem: {
    padding: 10,
  },
});
