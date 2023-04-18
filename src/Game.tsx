import { useCycle } from "framer-motion";
import DatingScene from "./Pages/DatingScene";
import Introduction from "./Pages/Introduction";

const stages = ["introduction", "cow"];

export default function () {
  let [currentStage, cycleStage] = useCycle(...stages);

  currentStage = "cow";

  switch (currentStage) {
    case "introduction":
      return <Introduction onComplete={cycleStage} />;
    case "cow":
      return <DatingScene />;
  }

  return <p>An error has occurred.</p>;
}
