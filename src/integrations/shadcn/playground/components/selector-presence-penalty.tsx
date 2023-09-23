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

export const PresencePenaltySelector: React.FC = () => {
  const [presencePenalty, setPresencePenalty] = usePlaygroundStore((s) => [
    s.presencePenalty,
    s.setPresencePenalty,
  ]);

  return (
    <div className="grid gap-2 pt-2">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="presencePenalty">Presence Penalty</Label>
              <Input
                dir="rtl"
                type="number"
                step={0.01}
                max={2}
                min={0}
                value={presencePenalty[0]}
                onChange={(e) =>
                  setPresencePenalty([parseFloat(e.target.value)])
                }
                className="w-20 px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border rounded-md border border-transparent"
              />
            </div>
            <Slider
              id="presencePenalty"
              max={2}
              min={0}
              defaultValue={presencePenalty}
              step={0.01}
              onValueChange={setPresencePenalty}
              className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
              aria-label="Presence Penalty"
            />
          </div>
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          className="w-[260px] text-sm"
          side="left"
        >
          Controls the penalty for using new tokens. Higher values make the
          model more conservative and focused on the prompt.
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};
