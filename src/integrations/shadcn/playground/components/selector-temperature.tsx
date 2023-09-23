/** @jsxImportSource react */
import * as React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/integrations/shadcn/ui/hover-card";
import { Label } from "~/integrations/shadcn/ui/label";
import { Slider } from "~/integrations/shadcn/ui/slider";
import { usePlaygroundStore } from "../playground-store";

interface TemperatureSelectorProps {}

export const TemperatureSelector: React.FC<TemperatureSelectorProps> = () => {
  const [temperature, setTemperature] = usePlaygroundStore((s) => [
    s.temperature,
    s.setTemperature,
  ]);

  return (
    <div className="grid gap-2 pt-2">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="temperature">Temperature</Label>
              <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                {temperature}
              </span>
            </div>
            <Slider
              id="temperature"
              max={2}
              min={0}
              defaultValue={temperature}
              step={0.01}
              onValueChange={setTemperature}
              className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
              aria-label="Temperature"
            />
          </div>
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          className="w-[260px] text-sm"
          side="left"
        >
          Controls randomness: lowering results in less random completions. As
          the temperature approaches zero, the model will become deterministic
          and repetitive.
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};
