import classes from "./style.module.css";
import CenteringBackdrop from "../../Components/CenteringBackdrop";
import { motion } from "framer-motion";
import ChatBox from "../../Components/ChatBox";
import { useState } from "react";

export type Emotion = "normal" | "embarrassed" | "angry" | "happy";

export type Interaction = {
  prompt: string;
  responses: [string, string];
  emotion?: Emotion;
};

export type InteractionTreeNode = {
  interaction: Interaction;
  children: [InteractionTreeNode, InteractionTreeNode] | string;
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
        emotion: "happy",
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
                    emotion: "happy",
                  },
                  children:
                    "Theseus and the Cow became lovers. They lived together until Theseus died of old age.",
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
                  children:
                    "The bull fell into a deep depression. Theseus continued on his journey and became Kind of Athens.",
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
                emotion: "embarrassed",
              },
              children: [
                {
                  interaction: {
                    prompt: "Just follow this road. Have a good one!",
                    responses: ["Thanks!", "You too!"],
                    emotion: "happy",
                  },
                  children:
                    "The bull lived happily ever after, terrorizing the people of Marathon. Theseus continued on his journey and became Kind of Athens.",
                },
                {
                  interaction: {
                    prompt: "A cutie like you must have a girl back home.",
                    responses: [
                      "Her name is Aethra.",
                      "I am a bachelor looking for some love.",
                    ],
                    emotion: "embarrassed",
                  },
                  children: [
                    {
                      interaction: {
                        prompt: "She must be gorgeous. Do you have kids!",
                        responses: ["She's my mom!", "Uhmm."],
                        emotion: "happy",
                      },
                      children: "The cow walked away. Nothing happened.",
                    },
                    {
                      interaction: {
                        prompt:
                          "So am I! But I only like guys that can beat me in a fight.",
                        responses: ["So be it.", "I'm good enough!"],
                      },
                      children:
                        "Theseus and the bull fought for hours. In the end, the bull won. After accidentally killing Theseus, it fell into depression and took it's own life.",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          interaction: {
            prompt: "A man of mystery, I like it.",
            responses: ["There is no bound to the darkness.", "..."],
            emotion: "embarrassed",
          },

          children: [
            {
              interaction: {
                prompt:
                  "I have not done much to improve this world, but I will do this: I will kill you.",
                responses: ["Okay then...", "I have nothing to lose."],
                emotion: "happy",
              },
              children: "And so the bull made this world a little lighter.",
            },
            {
              interaction: {
                prompt: "Okay hot stuff. Say less.",
                responses: [
                  "Let's get out of here.",
                  "I need someone to open up to..",
                ],
                emotion: "embarrassed",
              },
              children:
                "The bull and Theseus started talking. They discovered they had a lot in common and decided to get married.",
            },
          ],
        },
      ],
    },
    {
      interaction: {
        prompt: "I hate that name.",
        responses: ["Okee...", "Screw you too."],
        emotion: "angry",
      },
      children: [
        {
          interaction: {
            prompt:
              "I think we got off to a bad start. I am the terrible bull who wreaks upon this land of Marathon.",
            responses: [
              "I know you, end this madness!",
              "Down with your head!",
            ],
          },
          children: "Theseus fought the bull. He killed it easily.",
        },
        {
          interaction: {
            prompt:
              "And you call *me* a beast. With manners as foul as yours, the world will be glad I wiped you from existence!",
            responses: ["So be it.", "Let's fight!"],
            emotion: "angry",
          },
          children:
            "And so, the bull attacked Theseus. The bull did not survive.",
        },
      ],
    },
  ],
};

export default function ({
  onComplete,
}: {
  onComplete?: (endText: string) => void;
}) {
  const [currentNode, setCurrentNode] = useState(interactionTree);

  let emotionScale;

  switch (currentNode.interaction.emotion) {
    case "angry":
      emotionScale = 1.2;
      break;
    case "embarrassed":
      emotionScale = 0.8;
      break;
    case "happy":
      emotionScale = 1.2;
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
          if (typeof currentNode.children === "string") {
            if (onComplete != null) {
              onComplete(currentNode.children);
            }
          } else {
            setCurrentNode(currentNode.children[i]);
          }
        }}
      />
    </CenteringBackdrop>
  );
}
