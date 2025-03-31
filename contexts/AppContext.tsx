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
import { setSavedTasks } from "@/utils/setSavedTasks";

interface ContextProps {
  prize: number | null;
  setPrize: Dispatch<SetStateAction<number | null>>;
  openedTasks: ExtendedTask[];
  setOpenedTasks: (tasks: ExtendedTask[]) => Promise<void>;
}

const initialState: ContextProps = {
  prize: null,
  setPrize: () => false,
  openedTasks: [],
  setOpenedTasks: async () => undefined,
};

export const AppContext = createContext<ContextProps>(initialState);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [prize, setPrize] = useState<number | null>(null);
  const [openedTasks, setOpenedTasks] = useState<Array<ExtendedTask>>([]);

  useEffect(() => {
    getSavedTaskIds().then((tasks) => setOpenedTasks(tasks));
  }, []);

  const handleSetOpenedTasks = async (tasks: ExtendedTask[]) => {
    setOpenedTasks(tasks);
    await setSavedTasks(tasks);
  };

  return (
    <AppContext.Provider
      value={{
        prize,
        setPrize,
        openedTasks,
        setOpenedTasks: handleSetOpenedTasks,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
