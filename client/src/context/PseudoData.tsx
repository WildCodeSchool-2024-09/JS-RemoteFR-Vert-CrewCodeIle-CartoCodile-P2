import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import type { userData } from "../lib/definitions";

const PseudoContext = createContext<userData[]>([]);

const PseudoProvider = ({ children }: { children: ReactNode }) => {
  const pseudoArray: userData[] = [];
  return (
    <PseudoContext.Provider value={pseudoArray}>
      {children}
    </PseudoContext.Provider>
  );
};

export default PseudoProvider;

export const usePseudo = () => {
  const value: userData[] = useContext(PseudoContext);
  return value;
};
