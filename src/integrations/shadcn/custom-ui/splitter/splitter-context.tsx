/** @jsxImportSource react */
import React, { createContext, useContext, type ReactNode } from "react";

// Update the context type to include handleResize and size
export interface SplitterContextType {
  getPanelProps: (props: any) => any;
  getResizeTriggerProps: (props: any) => any;
  handleResize: (newSize: number[]) => void; // Add this line
  size: number[]; // Add this line
}

// Create the context
const SplitterContext = createContext<SplitterContextType | undefined>(
  undefined,
);

// Custom hook to use the context
export const useSplitterContext = () => {
  const context = useContext(SplitterContext);
  if (!context) {
    throw new Error(
      "useSplitterContext must be used within a SplitterProvider",
    );
  }
  return context;
};

// Provider component
interface SplitterProviderProps {
  value: SplitterContextType;
  children: ReactNode;
}

export const SplitterProvider: React.FC<SplitterProviderProps> = ({
  children,
  value,
}) => {
  return (
    <SplitterContext.Provider value={value}>
      {children}
    </SplitterContext.Provider>
  );
};
