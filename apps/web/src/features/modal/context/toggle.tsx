import { createContext, ReactNode, useState } from "react";

type ToggleContextType = {
  isOpen: boolean;
  handleToggle: (state: boolean) => void;
} | null;

const ToggleContext = createContext<ToggleContextType>(null);

function ToggleProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleToggle(state: boolean) {
    setIsOpen(state);
  }

  const values = {
    isOpen,
    handleToggle,
  };

  return (
    <ToggleContext.Provider value={values}>{children}</ToggleContext.Provider>
  );
}

export { ToggleProvider, ToggleContext };
