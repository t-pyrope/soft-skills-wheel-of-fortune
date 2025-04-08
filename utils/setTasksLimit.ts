import AsyncStorage from "@react-native-async-storage/async-storage";
import { i18n } from "@/i18n/config";

export const setTasksLimit = async (newLimit: number) => {
  const date = i18n.strftime(new Date(), "%d-%m-%Y");

  await AsyncStorage.setItem(
    "limit",
    JSON.stringify({ date, limit: newLimit }),
  );
};
