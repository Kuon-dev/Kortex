/** @jsxImportSource react */
import { useState, useEffect, useMemo } from "react";
import { usePlaygroundStore } from "./playground-store";
// import { type TiktokenModel, encodingForModel } from "js-tiktoken";
import { useDebounce } from "~/integrations/react/hooks/useDebounce";
import axios from "axios";

// Web Worker to handle token encoding

export const PlaygroundTokenCounter: React.FC = () => {
  const [totalTokens, setTotalTokens] = useState<number>(0);
  const [systemPrompt, userPrompt, model] = usePlaygroundStore((s) => [
    s.systemPrompt,
    s.newUserPrompt,
    s.model,
  ]);
  const debouncedSystemPrompt = useDebounce<string>(systemPrompt, 500);
  const debouncedUserPrompt = useDebounce<string>(userPrompt, 500);

  useEffect(() => {
    let isCancelled = false;

    const calculateTokensAsync = async () => {
      const [systemTokens, userTokens] = await Promise.all([
        axios.post("/api/token-counter/", {
          text: debouncedSystemPrompt,
          model: model?.name || "gpt-4",
        }),
        axios.post("/api/token-counter/", {
          text: debouncedUserPrompt,
          model: model?.name || "gpt-4",
        }),
      ]);

      const total = systemTokens.data.tokenCount + userTokens.data.tokenCount;

      if (!isCancelled) {
        setTotalTokens(total);
      }
    };

    calculateTokensAsync();

    return () => {
      isCancelled = true;
    };
  }, [debouncedSystemPrompt, debouncedUserPrompt, model]);

  return (
    <div>
      <p>Total Tokens: {totalTokens}</p>
    </div>
  );
};
