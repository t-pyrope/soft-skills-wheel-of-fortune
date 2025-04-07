import AsyncStorage from "@react-native-async-storage/async-storage";

import { Filters } from "@/types/Filters";

export const setSavedFilters = async (filters: Filters) => {
  await AsyncStorage.setItem("savedFilters", JSON.stringify(filters));
};
