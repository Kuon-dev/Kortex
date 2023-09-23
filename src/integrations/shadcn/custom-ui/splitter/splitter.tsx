/** @jsxImportSource react */
import React from "react";
import { useSplitter, type UseSplitterProps } from "./useSplitter";
import { SplitterProvider } from "./splitter-context";

interface SplitterProps extends UseSplitterProps {
  children: React.ReactNode;
}

export const Splitter: React.FC<SplitterProps> = (props) => {
  const splitterLogic = useSplitter(props);

  return (
    <SplitterProvider value={splitterLogic}>
      <div>{props.children}</div>
    </SplitterProvider>
  );
};
