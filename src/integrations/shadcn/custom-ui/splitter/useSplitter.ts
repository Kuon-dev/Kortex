import { useState, useCallback } from "react";

interface UseSplitterProps {
  defaultSize?: number[];
}

export interface UseSplitterReturn {
  size: number[];
  getPanelProps: (props: any) => any;
  getResizeTriggerProps: (props: any) => any;
  handleResize: (newSize: number[]) => void;
}

export const useSplitter = (props: UseSplitterProps): UseSplitterReturn => {
  const [size, setSize] = useState<number[]>(props.defaultSize || [50, 50]);

  const handleResize = useCallback((newSize: number[]) => {
    setSize(newSize);
  }, []);

  const getPanelProps = useCallback((panelProps: any) => {
    return panelProps;
  }, []);

  const getResizeTriggerProps = useCallback((triggerProps: any) => {
    return triggerProps;
  }, []);

  return {
    size,
    getPanelProps,
    getResizeTriggerProps,
    handleResize,
  };
};
