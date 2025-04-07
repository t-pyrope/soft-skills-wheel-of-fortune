import AsyncStorage from "@react-native-async-storage/async-storage";
import { ExtendedTask } from "@/types/Task";

export const getSavedTasks = async (): Promise<Array<ExtendedTask>> => {
  try {
    const savedTasksJSON = (await AsyncStorage.getItem("savedTasks")) ?? "[]";

    return (JSON.parse(savedTasksJSON) as ExtendedTask[]).map((task) => ({
      ...task,
      rating: task.rating ?? 0,
      addedOn: task.addedOn ? task.addedOn : Date.now(),
    }));
  } catch (e) {
    console.error(e);
    return [];
  }
};
