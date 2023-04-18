import classes from "./style.module.css";
import CenteringBackdrop from "../../Components/CenteringBackdrop";
import { motion } from "framer-motion";
import ChatBox from "../../Components/ChatBox";
import { useState } from "react";

export type Emotion = "normal" | "embarrassed" | "angry";

export type Interaction = {
  prompt: string;
  responses: [string?, string?];
  emotion?: Emotion;
};

export type InteractionTreeNode = {
  interaction: Interaction;
  children: [InteractionTreeNode, InteractionTreeNode] | null;
};

const interactionTree: InteractionTreeNode = {
  interaction: {
    prompt: "What is your name?",
    responses: ["Theseus", "Billy"],
  },
  children: [
    {
      interaction: {
        prompt: "I love that name! What brings you to the town of Marathon?",
        responses: ["I seek to become king of Athens.", "Reasons."],
      },
      children: [
        {
          interaction: {
            prompt:
              "What a noble pursuit! A handsome boy like you will have no trouble taking the crown.",
            responses: ["You're not too bad yourself.", "I agree"],
          },
          children: [
            {
              interaction: {
                prompt: "*Did he just complement me?*",
                responses: ["Yes, hottie.", "How do I get to Athens?"],
                emotion: "embarrassed",
              },
              children: [
                {
                  interaction: {
                    prompt: "Oh hunka hunka. Wanna get out of here?",
                    responses: ["Oh for sure!", "Your place, or mine?"],
                    emotion: "embarrassed",
                  },
                  children: null,
                },
                {
                  interaction: {
                    prompt:
                      "*He just got my hopes up* :(* Sure. Just follow this path...",
                    responses: [
                      "Have a good one!",
                      "You'll find someone someday!",
                    ],
                  },
                  children: null,
                },
              ],
            },
            {
              interaction: {
                prompt: "Such confidence. I wish I could find a boy like you.",
                responses: [
                  "How do I get to Athens?",
                  "There are no boys like me.",
                ],
              },
              children: null,
            },
          ],
        },
        {
          interaction: {
            prompt: "A man of mystery, I like it.",
            responses: [""],
          },
          children: null,
        },
      ],
    },
    {
      interaction: {
        prompt: "I hate that name.",
        responses: ["Okee...", "Screw you too."],
      },
      children: [
        {
          interaction: {
            prompt:
              "I think we got off to a bad start. I am the terrible bull who wreaks upon this land of Marathon.",
            responses: ["I have heard of you.", "Down with your head!"],
          },
          children: null,
        },
        {
          interaction: {
            prompt:
              "And you call *me* a beast. With manners as foul as yours, the world will be glad I wiped you from existence!",
            responses: ["So be it.", "Let's fight!"],
            emotion: "angry",
          },
          children: null,
        },
      ],
    },
  ],
};

export default function ({ onComplete }: { onComplete?: () => void }) {
  const [currentNode, setCurrentNode] = useState(interactionTree);

  let emotionScale;

  switch (currentNode.interaction.emotion) {
    case "angry":
      emotionScale = 1.2;
      break;
    case "embarrassed":
      emotionScale = 0.8;
      break;
    case "normal":
      emotionScale = 1;
      break;
  }

  return (
    <CenteringBackdrop src="rendered/background.webp">
      <motion.img
        animate={{ scale: emotionScale }}
        transition={{
          type: "spring",
          duration: 0.3,
        }}
        src={`rendered/cow-${currentNode.interaction.emotion ?? "normal"}.webp`}
        className={classes.enemy}
      ></motion.img>
      <ChatBox
        key={currentNode.interaction.prompt}
        interaction={currentNode.interaction}
        name="The Cow"
        onResponse={(i) => {
          if (currentNode.children != null) {
            setCurrentNode(currentNode.children[i]);
          } else if (onComplete != null) {
            onComplete();
          }
        }}
      />
    </CenteringBackdrop>
  );
}
