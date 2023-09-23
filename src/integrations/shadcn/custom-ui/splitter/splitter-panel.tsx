/** @jsxImportSource react */
import React from "react";
import { useSplitterContext } from "./splitter-context";

interface SplitterPanelProps {
  id: string;
  children: React.ReactNode;
}

export const SplitterPanel: React.FC<SplitterPanelProps> = (props) => {
  const { getPanelProps } = useSplitterContext();
  const panelProps = getPanelProps({ id: props.id });

  return <div {...panelProps}>{props.children}</div>;
};
