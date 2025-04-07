import { StyleSheet, TouchableOpacity } from "react-native";
import { StyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";
import { ViewStyle } from "react-native/Libraries/StyleSheet/StyleSheetTypes";

import { ExtendedTask } from "@/types/Task";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { StarRating } from "@/components/Rating";
import { DEFINITIONS } from "@/constants/softSkills";
import { useAppContext } from "@/contexts/AppContext";
import { i18n } from "@/i18n/config";

export const OpenedTask = ({ task }: { task: ExtendedTask }) => {
  const { openedTasks, setOpenedTasks } = useAppContext();

  const softSkillTitle = DEFINITIONS.find(
    (definition) => definition.index === task.parentId,
  )?.title;

  const handleChipPress = async () => {
    const updatedTasks = openedTasks.map((openedTask) =>
      openedTask.id === task.id ? { ...task, done: !task.done } : openedTask,
    );

    await setOpenedTasks(updatedTasks);
  };

  const handleSetRating = async (newRating: number) => {
    const updatedTasks = openedTasks.map((openedTask) =>
      openedTask.id === task.id ? { ...task, rating: newRating } : openedTask,
    );

    await setOpenedTasks(updatedTasks);
  };

  const chipStyles: StyleProp<ViewStyle> = [styles.doneChip];

  if (task.done) {
    chipStyles.push(styles.isDone);
  }

  return (
    <ThemedView style={styles.taskItem}>
      <ThemedText>{task.text[i18n.locale as "en"]}</ThemedText>
      {softSkillTitle && (
        <ThemedView style={styles.text}>
          <ThemedText type="defaultSemiBold">
            {i18n.t("openedTasks.task.category")}:
          </ThemedText>
          <ThemedText>{softSkillTitle}</ThemedText>
        </ThemedView>
      )}
      <ThemedView style={[styles.text, { marginBlock: 6 }]}>
        <ThemedText type="defaultSemiBold">My rating:</ThemedText>
        <StarRating rating={task.rating} setRating={handleSetRating} />
      </ThemedView>
      <ThemedView style={chipStyles}>
        <TouchableOpacity onPress={handleChipPress}>
          <ThemedText>
            {task.done
              ? i18n.t("openedTasks.task.done")
              : i18n.t("openedTasks.task.notDone")}
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  taskItem: {
    padding: 10,
  },
  text: {
    flexDirection: "row",
    gap: 3,
    alignItems: "center",
  },
  doneChip: {
    borderRadius: 20,
    paddingLeft: 14,
    paddingRight: 14,
    paddingTop: 4,
    paddingBottom: 4,
    fontSize: 20,
    alignSelf: "flex-start",
    marginTop: 10,
    borderColor: "#bfbbec",
    borderWidth: 2,
  },
  isDone: {
    backgroundColor: "#bfbbec",
  },
});
