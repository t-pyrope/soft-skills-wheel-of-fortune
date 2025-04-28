import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Header } from "@/components/Header";
import { i18n } from "@/i18n/config";
import { getSavedTasks } from "@/utils/getSavedTasks";
import { ThemedText } from "@/components/ThemedText";
import { OpenedTask } from "@/components/OpenedTask";
import { useAppContext } from "@/contexts/AppContext";
import { RadioGroup } from "@/components/ui/RadioGroup";
import { Filters } from "@/types/Filters";
import {
  DEFAULT_SAVED_FILTERS,
  getSavedFilters,
} from "@/utils/getSavedFilters";
import { setSavedFilters } from "@/utils/setSavedFilters";

export default function OpenedTasks() {
  const { openedTasks, setOpenedTasks } = useAppContext();
  const [filters, setFilters] = useState<Filters>(DEFAULT_SAVED_FILTERS);
  const [loadingState, setLoadingState] = useState<"loading" | "loaded">(
    "loading",
  );

  useEffect(() => {
    if (openedTasks.length) return;
    const getTasks = async () => {
      try {
        const savedTasks = await getSavedTasks();

        await setOpenedTasks(savedTasks);
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingState("loaded");
      }
    };

    getTasks();
  }, [openedTasks.length]);

  useEffect(() => {
    getSavedFilters().then((tempFilters) => setFilters(tempFilters));
  }, []);

  const saveDoneFilters = (newDoneFilter: string) => {
    const newFilters = {
      ...filters,
      doneFilter: newDoneFilter as Filters["doneFilter"],
    };
    setFilters(newFilters);
    setSavedFilters(newFilters);
  };

  const filteredTasks =
    filters.doneFilter === "all"
      ? openedTasks.slice().sort((a, b) => (a.done ? 1 : 1))
      : openedTasks.filter(
          (task) => task.done === (filters.doneFilter === "done"),
        );

  return (
    <SafeAreaView style={styles.container}>
      <Header title={i18n.t("openedTasks.title")} />
      <RadioGroup
        options={[
          { value: "all", label: i18n.t("openedTasks.doneFilter.all") },
          { value: "done", label: i18n.t("openedTasks.doneFilter.done") },
          { value: "undone", label: i18n.t("openedTasks.doneFilter.undone") },
        ]}
        selectedValue={filters.doneFilter}
        onSelect={saveDoneFilters}
        label={i18n.t("openedTasks.doneFilter.label")}
      />
      {loadingState === "loaded" && openedTasks.length === 0 && (
        <ThemedText>{i18n.t("openedTasks.noTasks")}</ThemedText>
      )}
      <View>
        <FlatList
          data={filteredTasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <OpenedTask task={item} />}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
    position: "static",
    padding: 20,
    paddingBottom: 40,
    backgroundColor: "#faf6f0",
  },
});
