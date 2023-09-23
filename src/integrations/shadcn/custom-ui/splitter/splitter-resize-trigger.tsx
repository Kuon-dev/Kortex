/** @jsxImportSource react */
import React, { useState, useEffect } from "react";
import { useSplitterContext } from "./splitter-context";

interface SplitterResizeTriggerProps {
  id: string;
}

export const SplitterResizeTrigger: React.FC<SplitterResizeTriggerProps> = (
  props,
) => {
  const { getResizeTriggerProps, handleResize, size } = useSplitterContext();
  const [isResizing, setIsResizing] = useState(false);
  const [initialMousePosition, setInitialMousePosition] = useState(0);
  const [initialSize, setInitialSize] = useState<number[]>([]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsResizing(true);
    setInitialMousePosition(e.clientX);
    setInitialSize(size);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isResizing) {
      const delta = e.clientX - initialMousePosition;
      const newSize = initialSize.map((s, index) => {
        return index === 0 ? s + delta : s - delta;
      });
      handleResize(newSize);
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  useEffect(() => {
    if (isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  const resizeTriggerProps = getResizeTriggerProps({ id: props.id });

  return (
    <div {...resizeTriggerProps} onMouseDown={handleMouseDown}>
      {/* Visual indicator for resizing */}
    </div>
  );
};
