import { motion, useCycle } from "framer-motion";
import { useEffect, useState } from "react";
import CenteringBackdrop from "../../Components/CenteringBackdrop";
import useTypingAnimation from "../../Hooks/useTypingAnimation";
import classes from "./style.module.css";

const story = [
  "Long ago in the kingdom of Troezen..",
  "..there was a boy.",
  "His entire life, he thought he was special..",
  "..but he never knew why.",
  "Until his 18th birthday...",
  "..when his mother told him...",
  "..he was the son of the King of Athens.",
  "That boy's name was Theseus.",
  "This is the story of his journey to become ruler of the greatest kingdom of Ancient Greece.",
];

export default function ({ onComplete }: { onComplete?: () => void }) {
  const [storyPrompt, cycle] = useCycle(...story);
  const [cycles, setCycles] = useState(0);
  const displayText = useTypingAnimation(storyPrompt);

  useEffect(() => {
    if (cycles > story.length - 1 && onComplete != null) {
      onComplete();
    }
  }, [cycles]);

  return (
    <CenteringBackdrop>
      <p
        className={classes.text}
        onClick={() => {
          cycle();
          setCycles(cycles + 1);
        }}
      >
        {displayText}
      </p>
      <p className={`${classes.text} ${classes.subtitle}`}>(click)</p>
    </CenteringBackdrop>
  );
}
