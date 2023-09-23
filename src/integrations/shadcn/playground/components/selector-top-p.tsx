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

export const TopPSelector: React.FC = () => {
  const [topP, setTopP] = usePlaygroundStore((s) => [s.topP, s.setTopP]);

  return (
    <div className="grid gap-2 pt-2">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="topP">Top P</Label>
              <Input
                dir="rtl"
                step={0.01}
                type="number"
                value={topP[0]}
                onChange={(e) => setTopP([parseFloat(e.target.value)])}
                className="w-20 px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border rounded-md border border-transparent"
              />
            </div>
            <Slider
              id="topP"
              max={1}
              defaultValue={topP}
              step={0.01}
              onValueChange={setTopP}
              className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
              aria-label="Top P"
            />
          </div>
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          className="w-[260px] text-sm"
          side="left"
        >
          Controls the diversity of the generated text. Lower values make the
          output more focused and deterministic, while higher values offer more
          randomness.
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};
