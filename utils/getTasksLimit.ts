import AsyncStorage from "@react-native-async-storage/async-storage";

import { i18n } from "@/i18n/config";

export const getTasksLimit = async (): Promise<number> => {
  const date = i18n.strftime(new Date(), "%d-%m-%Y");

  try {
    const limitObj = await AsyncStorage.getItem("limit");

    if (limitObj) {
      const limit = JSON.parse(limitObj);

      if (
        "date" in limit &&
        limit.date === date &&
        "limit" in limit &&
        typeof limit.limit === "number"
      ) {
        return limit.limit;
      }
    }

    return 5;
  } catch (e) {
    console.error(e);
    return 5;
  }
};
