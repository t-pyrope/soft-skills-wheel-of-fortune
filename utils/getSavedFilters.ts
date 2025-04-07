import AsyncStorage from "@react-native-async-storage/async-storage";
import { Filters } from "@/types/Filters";

export const DEFAULT_SAVED_FILTERS: Filters = {
  doneFilter: "all",
};

export const getSavedFilters = async (): Promise<Filters> => {
  try {
    const savedFiltersJSON = await AsyncStorage.getItem("savedFilters");

    return savedFiltersJSON
      ? JSON.parse(savedFiltersJSON)
      : DEFAULT_SAVED_FILTERS;
  } catch (e) {
    console.error(e);
    return DEFAULT_SAVED_FILTERS;
  }
};
