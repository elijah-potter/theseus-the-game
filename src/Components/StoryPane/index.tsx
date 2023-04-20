import { motion, useCycle } from "framer-motion";
import { useEffect, useState } from "react";
import CenteringBackdrop from "../../Components/CenteringBackdrop";
import useTypingAnimation from "../../Hooks/useTypingAnimation";
import classes from "./style.module.css";

export default function ({
  onComplete,
  story,
}: {
  onComplete?: () => void;
  story: string[];
}) {
  const [storyPrompt, cycle] = useCycle(...story);
  const [cycles, setCycles] = useState(0);
  const displayText = useTypingAnimation(storyPrompt);

  useEffect(() => {
    const callback = () => {
      cycle();
      setCycles(cycles + 1);
    };
    window.addEventListener("pointerdown", callback);

    return () => window.removeEventListener("pointerdown", callback);
  }, [onComplete, cycles]);

  useEffect(() => {
    if (cycles > story.length - 1 && onComplete != null) {
      onComplete();
    }
  }, [cycles]);

  return (
    <CenteringBackdrop>
      <p className={classes.text}>{displayText}</p>
      <p className={`${classes.text} ${classes.subtitle}`}>(click)</p>
    </CenteringBackdrop>
  );
}
