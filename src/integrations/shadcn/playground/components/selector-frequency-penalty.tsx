/** @jsxImportSource react */
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/integrations/shadcn/ui/hover-card";
import { Label } from "~/integrations/shadcn/ui/label";
import { Slider } from "~/integrations/shadcn/ui/slider";
import { Input } from "../../ui/input";
import { usePlaygroundStore } from "../playground-store";

export const FrequencyPenaltySelector: React.FC = () => {
  const [frequencyPenalty, setFrequencyPenalty] = usePlaygroundStore((s) => [
    s.frequencyPenalty,
    s.setFrequencyPenalty,
  ]);

  return (
    <div className="grid gap-2 pt-2">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="frequencyPenalty">Frequency Penalty</Label>
              <Input
                dir="rtl"
                step={0.01}
                max={2}
                min={0}
                type="number"
                value={frequencyPenalty[0]}
                onChange={(e) =>
                  setFrequencyPenalty([parseFloat(e.target.value)])
                }
                className="w-20 px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border rounded-md border border-transparent"
              />
            </div>
            <Slider
              id="frequencyPenalty"
              max={2}
              min={0}
              defaultValue={frequencyPenalty}
              step={0.01}
              onValueChange={setFrequencyPenalty}
              className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
              aria-label="Frequency Penalty"
            />
          </div>
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          className="w-[260px] text-sm"
          side="left"
        >
          Controls the penalty for using frequent tokens. Higher values
          discourage the model from using common words.
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};
