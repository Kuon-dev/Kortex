/** @jsxImportSource react */
import { models, types } from "./data/models";
import { ModelSelector } from "./components/model-selector";
import { FrequencyPenaltySelector } from "./components/selector-frequency-penalty";
import { MaxLengthSelector } from "./components/selector-maxlength";
import { PresencePenaltySelector } from "./components/selector-presence-penalty";
import { TemperatureSelector } from "./components/selector-temperature";
import { TopPSelector } from "./components/selector-top-p";

export const PlaygroundSidebar = () => {
  return (
    <>
      <ModelSelector types={types} models={models} />
      <TemperatureSelector />
      <MaxLengthSelector />
      <TopPSelector />
      <FrequencyPenaltySelector />
      <PresencePenaltySelector />
    </>
  );
};

export default PlaygroundSidebar;
