/** @jsxImportSource react */
import { CounterClockwiseClockIcon } from "@radix-ui/react-icons";

import { Button } from "~/integrations/shadcn/ui/button";
import { Textarea } from "~/integrations/shadcn/ui/textarea";
import { usePlaygroundStore, type State } from "./playground-store";
// import { Image } from "@unpic/react"
interface PlaygroundPageProps {
  onDataEmit: (data: State) => void;
}

export const PlaygroundPage: React.FC<PlaygroundPageProps> = ({
  onDataEmit,
}) => {
  const [systemPrompt, setSystemPrompt] = usePlaygroundStore((s) => [
    s.systemPrompt,
    s.setSystemPrompt,
  ]);
  const [userPrompt, setUserPrompt] = usePlaygroundStore((s) => [
    s.newUserPrompt,
    s.setNewUserPrompt,
  ]);

  const store = usePlaygroundStore.getState();
  const handleSubmit = () => {
    const {
      model,
      systemPrompt,
      messages,
      redirects,
      temperature,
      maxLength,
      topP,
      frequencyPenalty,
      presencePenalty,
      stop,
      newUserPrompt,
    } = store;

    // Emit only the state fields back to the parent component
    onDataEmit({
      model,
      systemPrompt,
      messages,
      redirects,
      temperature,
      maxLength,
      topP,
      frequencyPenalty,
      presencePenalty,
      stop,
      newUserPrompt,
    });
  };
  return (
    <div className="flex flex-col space-y-4">
      <div className="grid h-full grid-rows-2 gap-6 lg:grid-cols-2 lg:grid-rows-1">
        <div className="flex flex-col h-full min-h-[300px] lg:min-h-[700px] xl:min-h-[700px] gap-5">
          <Textarea
            placeholder="System prompt"
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
            className="basis-1/2"
          />
          <Textarea
            placeholder="User prompt"
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            className="basis-1/2"
          />
        </div>
        <div className="rounded-md border border-primary bg-muted"></div>
      </div>
      <div className="flex items-center space-x-2">
        <Button onClick={() => handleSubmit()}>Submit</Button>
        <Button variant="secondary">
          <span className="sr-only">Show history</span>
          <CounterClockwiseClockIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
