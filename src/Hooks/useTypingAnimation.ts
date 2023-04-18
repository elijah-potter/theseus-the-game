import { useAnimationFrame, useTime } from "framer-motion";
import { useEffect, useState } from "react";

export default function (text: string, waitInSeconds = 0) {
  const [startTime, setStartTime] = useState(Date.now());
  const [currentTime, setCurrentTime] = useState(Date.now());
  useAnimationFrame(() => setCurrentTime(Date.now()));

  const elapsedTime = currentTime - startTime;

  useEffect(() => {
    setStartTime(Date.now());
  }, [text]);

  let timeBudget = (elapsedTime - waitInSeconds * 1000) / 10;

  let output = "";

  while (timeBudget > 0 && output.length < text.length) {
    const c = text[output.length];

    if (c === " ") {
      timeBudget -= 10;
    } else {
      timeBudget -= 3;
    }

    output += c;
  }

  return output;
}
