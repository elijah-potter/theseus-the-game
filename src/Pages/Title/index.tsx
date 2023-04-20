import classes from "./style.module.css";
import CenteringBackdrop from "../../Components/CenteringBackdrop";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function ({ onComplete }: { onComplete?: () => void }) {
  useEffect(() => {
    const callback = () => (onComplete != null ? onComplete() : null);

    window.addEventListener("pointerdown", callback);

    return () => window.removeEventListener("pointerdown", callback);
  }, [onComplete]);

  const clouds = [];

  for (let i = 0; i < 10; i++) {
    const x = (Math.random() - 0.5) * 100;

    clouds.push(
      <motion.img
        key={i.toString()}
        className={classes.cloud}
        src={`rendered/cloud-${Math.ceil(Math.random() * 2)}.webp`}
        initial={{
          x: `${x}vw`,
          y: `${(Math.random() - 0.5) * 100}vh`,
        }}
        animate={{ x: `${-200 + Math.random() * 100}vw` }}
        transition={{
          type: "tween",
          duration: 120,
          repeat: Infinity,
          repeatType: "loop",
        }}
      />
    );
  }

  return (
    <CenteringBackdrop color="#87CEEB">
      {clouds}
      <div className={classes.container}>
        {"Theseus: The Game".split("").map((c, index) => (
          <motion.h1
            className={classes.title}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.2 }}
            key={index.toString()}
            transition={{ type: "spring", damping: 5, velocity: 2 }}
          >
            {c}
          </motion.h1>
        ))}
      </div>
      <h2 className={classes.subtitle}>(click to start)</h2>
    </CenteringBackdrop>
  );
}
