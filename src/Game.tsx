import { useCycle } from "framer-motion";
import { useState } from "react";
import StoryPane from "./Components/StoryPane";
import DatingScene from "./Pages/DatingScene";
import Title from "./Pages/Title";

const stages = ["title", "introduction", "cow"];

const introduction = [
  "Long ago in the kingdom of Troezen..",
  "..there was a boy.",
  "On his 16th birthday...",
  "..his mother told him...",
  "..he was the son of the King of Athens.",
  "That boy's name was Theseus.",
  "On his journey to take the throne he encountered a bull...",
  "Will he befriend it, or kill it?",
];

type CurrentStage =
  | {
      kind: "title";
    }
  | {
      kind: "introduction";
    }
  | {
      kind: "cow";
    }
  | {
      kind: "end";
      content: string;
    };

export default function () {
  const [currentStage, setCurrentStage] = useState<CurrentStage>({
    kind: "title",
  });

  switch (currentStage.kind) {
    case "title":
      return (
        <Title onComplete={() => setCurrentStage({ kind: "introduction" })} />
      );
    case "introduction":
      return (
        <StoryPane
          onComplete={() => setCurrentStage({ kind: "cow" })}
          story={introduction}
        />
      );
    case "cow":
      return (
        <DatingScene
          onComplete={(finalText) =>
            setCurrentStage({ kind: "end", content: finalText })
          }
        />
      );
    case "end":
      return (
        <StoryPane
          story={[currentStage.content + " The End."]}
          onComplete={() => location.reload()}
        />
      );
  }
}
