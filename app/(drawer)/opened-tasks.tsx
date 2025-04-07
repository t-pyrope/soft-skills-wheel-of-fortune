import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Header } from "@/components/Header";
import { i18n } from "@/i18n/config";
import { getSavedTaskIds } from "@/utils/getSavedTaskIds";
import { ThemedText } from "@/components/ThemedText";
import { OpenedTask } from "@/components/OpenedTask";
import { useAppContext } from "@/contexts/AppContext";
import { RadioGroup } from "@/components/ui/RadioGroup";

export default function OpenedTasks() {
  const { openedTasks, setOpenedTasks } = useAppContext();
  const [doneFilter, setDoneFilter] = useState("all");
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

  const filteredTasks =
    doneFilter === "all"
      ? openedTasks
      : openedTasks.filter((task) => task.done === (doneFilter === "done"));

  return (
    <SafeAreaView style={styles.container}>
      <Header title={i18n.t("openedTasks.title")} />
      <RadioGroup
        options={[
          { value: "all", label: i18n.t("openedTasks.doneFilter.all") },
          { value: "done", label: i18n.t("openedTasks.doneFilter.done") },
          { value: "undone", label: i18n.t("openedTasks.doneFilter.undone") },
        ]}
        selectedValue={doneFilter}
        onSelect={setDoneFilter}
        label={i18n.t("openedTasks.doneFilter.label")}
      />
      {loadingState === "loaded" && openedTasks.length === 0 && (
        <ThemedText>{i18n.t("openedTasks.noTasks")}</ThemedText>
      )}
      {filteredTasks.map((task) => (
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
