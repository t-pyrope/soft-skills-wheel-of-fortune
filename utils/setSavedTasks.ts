import { ExtendedTask } from "@/types/Task";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const setSavedTasks = async (tasks: ExtendedTask[]) => {
  await AsyncStorage.setItem("savedTasks", JSON.stringify(tasks));
};
