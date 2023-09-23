/** @jsxImportSource react */
import * as React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/integrations/shadcn/ui/hover-card";
import { Label } from "~/integrations/shadcn/ui/label";
import { Slider } from "~/integrations/shadcn/ui/slider";
import { Input } from "../../ui/input";
import { usePlaygroundStore } from "../playground-store";
import { cn } from "~/lib/utils";

interface MaxLengthSelectorProps {}

export const MaxLengthSelector: React.FC<MaxLengthSelectorProps> = () => {
  const [maxLength, setMaxLength] = usePlaygroundStore((s) => [
    s.maxLength,
    s.setMaxLength,
  ]);

  return (
    <div className="grid gap-2 pt-2">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="maxlength">Maximum Length</Label>
              <Input
                dir="rtl"
                type="number"
                value={maxLength[0]}
                onChange={(e) => setMaxLength([parseFloat(e.target.value)])}
                className={cn(
                  "w-20 px-2 py-0.5 text-right text-sm text-muted-foreground",
                  "hover:border-border rounded-md border border-transparent",
                )}
              />
            </div>
            <Slider
              id="maxlength"
              max={4000}
              defaultValue={maxLength}
              step={10}
              onValueChange={setMaxLength}
              className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
              aria-label="Maximum Length"
            />
          </div>
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          className="w-[260px] text-sm"
          side="left"
        >
          The maximum number of tokens to generate. Requests can use up to 2,048
          or 4,000 tokens, shared between prompt and completion. The exact limit
          varies by model.
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};
