import {
  ReactNode,
  createContext,
  useEffect,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";

import { getFirestore } from "@firebase/firestore";
import { app } from "@/firebaseConfig";

interface ContextProps {
  prize: number | null;
  setPrize: Dispatch<SetStateAction<number | null>>;
}

const initialState: ContextProps = {
  prize: null,
  setPrize: () => false,
};

const db = getFirestore(app);

export const AppContext = createContext<ContextProps>(initialState);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [prize, setPrize] = useState<number | null>(null);

  return (
    <AppContext.Provider value={{ prize, setPrize }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
