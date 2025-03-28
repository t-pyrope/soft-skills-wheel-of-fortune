import AsyncStorage from "@react-native-async-storage/async-storage";
import { ExtendedTask } from "@/types/Task";

export const getSavedTaskIds = async (): Promise<Array<ExtendedTask>> => {
  try {
    const savedTasksJSON = (await AsyncStorage.getItem("savedTasks")) ?? "[]";
    return JSON.parse(savedTasksJSON);
  } catch (e) {
    console.error(e);
    return [];
  }
};
