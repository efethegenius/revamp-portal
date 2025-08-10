import { createContext } from "react";
import type { AppContextType } from "./AppContext.types";

export const AppContext = createContext<AppContextType>({
  isDarkMode: false,
  setIsDarkMode: () => {},
  showToast: () => {},
  // email: "",
  // contextEmail: "",
  // setContextEmail: () => {},
  // setEmail: () => {},
  // policyData: [],
  // setPolicyData: () => {},
});
