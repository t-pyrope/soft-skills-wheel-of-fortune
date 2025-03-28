import {
  ReactNode,
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

import { ExtendedTask } from "@/types/Task";
import { getSavedTaskIds } from "@/utils/getSavedTaskIds";

interface ContextProps {
  prize: number | null;
  setPrize: Dispatch<SetStateAction<number | null>>;
  openedTasks: ExtendedTask[];
  setOpenedTasks: Dispatch<SetStateAction<Array<ExtendedTask>>>;
}

const initialState: ContextProps = {
  prize: null,
  setPrize: () => false,
  openedTasks: [],
  setOpenedTasks: () => false,
};

export const AppContext = createContext<ContextProps>(initialState);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [prize, setPrize] = useState<number | null>(null);
  const [openedTasks, setOpenedTasks] = useState<Array<ExtendedTask>>([]);

  useEffect(() => {
    getSavedTaskIds().then((tasks) => setOpenedTasks(tasks));
  }, []);

  return (
    <AppContext.Provider
      value={{ prize, setPrize, openedTasks, setOpenedTasks }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
