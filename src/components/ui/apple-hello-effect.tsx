"use client";

import type { TargetAndTransition } from "motion/react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

const initialProps: TargetAndTransition = {
  pathLength: 0,
  opacity: 0,
};

const animateProps: TargetAndTransition = {
  pathLength: 1,
  opacity: 1,
};

type Props = React.ComponentProps<typeof motion.svg> & {
  speed?: number;
  onAnimationComplete?: () => void;
};

function AppleHelloEnglishEffect({
  className,
  speed = 1,
  onAnimationComplete,
  ...props
}: Props) {
  const calc = (x: number) => x * speed;

  return (
    <motion.svg
      className={cn("h-20", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 400 200"
      fill="none"
      stroke="currentColor"
      strokeWidth="14.8883"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      <title>hi</title>

      {/* h */}
      <motion.path
        d="M8.69214 166.553C36.2393 151.239 61.3409 131.548 89.8191 98.0295C109.203 75.1488 119.625 49.0228 120.122 31.0026C120.37 17.6036 113.836 7.43883 101.759 7.43883C88.3598 7.43883 79.9231 17.6036 74.7122 40.9363C69.005 66.5793 64.7866 96.0036 54.1166 190.356"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(0.8),
          ease: "easeInOut",
          opacity: { duration: 0.4 },
        }}
      />

      {/* i */}
      <motion.path
        d="M195 50 L195 140"
        style={{ strokeLinecap: "round" }}
        initial={initialProps}
        animate={animateProps}
        transition={{
          duration: calc(0.6),
          ease: "easeInOut",
          delay: calc(0.7),
          opacity: { duration: 0.3, delay: calc(0.7) },
        }}
      />

      {/* i dot */}
      <motion.circle
        cx={195}
        cy={30}
        r={5}
        fill="currentColor"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: calc(0.3),
          ease: "easeOut",
          delay: calc(1.2),
        }}
        onAnimationComplete={onAnimationComplete}
      />
    </motion.svg>
  );
}

export { AppleHelloEnglishEffect };
