import classes from "./style.module.css";
import { motion } from "framer-motion";
import { Interaction } from "../../Pages/DatingScene";
import useTypingAnimation from "../../Hooks/useTypingAnimation";

export default function ({
  interaction,
  name,
  onResponse,
}: {
  interaction: Interaction;
  name: string;
  onResponse?: (responseIndex: number) => void;
}) {
  const prompt = useTypingAnimation(interaction.prompt, 0.6);

  return (
    <motion.div
      initial={{
        y: "100vh",
      }}
      animate={{
        y: "0px",
      }}
      className={classes.textbox}
    >
      <p className={classes.label}>{name}</p>
      <p className={classes.text}>"{prompt}"</p>
      <div className={classes.buttoncontainer}>
        {interaction.responses.map((response, index) => (
          <button
            className={classes.chatbutton}
            onClick={() => (onResponse != null ? onResponse(index) : null)}
          >
            <motion.img
              src="rendered/arrow.webp"
              className={classes.arrow}
              initial={{
                x: -10,
              }}
              animate={{
                x: 0,
              }}
              transition={{
                repeat: Infinity,
                type: "tween",
                repeatType: "mirror",
              }}
            />
            "{response}"
          </button>
        ))}
      </div>
    </motion.div>
  );
}
