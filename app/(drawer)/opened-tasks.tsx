import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Header } from "@/components/Header";
import { i18n } from "@/i18n/config";
import { getSavedTaskIds } from "@/utils/getSavedTaskIds";
import { ThemedText } from "@/components/ThemedText";
import { OpenedTask } from "@/components/OpenedTask";
import { useAppContext } from "@/contexts/AppContext";

export default function OpenedTasks() {
  const { openedTasks, setOpenedTasks } = useAppContext();
  const [loadingState, setLoadingState] = useState<"loading" | "loaded">(
    "loading",
  );

  useEffect(() => {
    if (openedTasks.length) return;
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
  }, [openedTasks.length]);

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
});
