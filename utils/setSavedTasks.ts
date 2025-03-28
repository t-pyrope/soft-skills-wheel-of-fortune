import { ExtendedTask } from "@/types/Task";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";

export const setSavedTasks = async (
  tasks: ExtendedTask[],
  setOpenedTasks: React.Dispatch<React.SetStateAction<ExtendedTask[]>>,
) => {
  setOpenedTasks(tasks);
  await AsyncStorage.setItem("savedTasks", JSON.stringify(tasks));
};
