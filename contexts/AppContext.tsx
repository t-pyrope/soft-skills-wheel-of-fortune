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
import { getSavedTasks } from "@/utils/getSavedTasks";
import { setSavedTasks } from "@/utils/setSavedTasks";
import { getTasksLimit } from "@/utils/getTasksLimit";
import { setTasksLimit } from "@/utils/setTasksLimit";

interface ContextProps {
  prize: number | null;
  setPrize: Dispatch<SetStateAction<number | null>>;
  openedTasks: ExtendedTask[];
  setOpenedTasks: (tasks: ExtendedTask[]) => Promise<void>;
  limit: number;
  decreaseLimit: () => void;
}

const initialState: ContextProps = {
  prize: null,
  setPrize: () => false,
  openedTasks: [],
  setOpenedTasks: async () => undefined,
  limit: 5,
  decreaseLimit: () => undefined,
};

export const AppContext = createContext<ContextProps>(initialState);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [prize, setPrize] = useState<number | null>(null);
  const [openedTasks, setOpenedTasks] = useState<Array<ExtendedTask>>([]);
  const [limit, setLimit] = useState(0);

  useEffect(() => {
    getSavedTasks().then((tasks) => {
      setOpenedTasks(tasks);
    });

    getTasksLimit().then((newLimit) => setLimit(newLimit));
  }, []);

  const handleSetOpenedTasks = async (tasks: ExtendedTask[]) => {
    setOpenedTasks(tasks);
    await setSavedTasks(tasks);
  };

  const handleDecreaseLimit = async () => {
    if (limit === 0) {
      return;
    }

    const newLimit = limit - 1;

    setLimit(newLimit);
    await setTasksLimit(newLimit);
  };

  return (
    <AppContext.Provider
      value={{
        limit,
        prize,
        setPrize,
        openedTasks,
        setOpenedTasks: handleSetOpenedTasks,
        decreaseLimit: handleDecreaseLimit,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
