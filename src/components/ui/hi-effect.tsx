"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = React.ComponentProps<typeof motion.div> & {
  speed?: number;
  onAnimationComplete?: () => void;
};

export function HiEffect({
  className,
  speed = 1,
  onAnimationComplete,
  ...props
}: Props) {
  const calc = (x: number) => x * speed;

  const letters = [
    { char: "H", delay: 0 },
    { char: "i", delay: 0.3 },
    { char: "!", delay: 0.6 },
  ];

  return (
    <motion.div
      className={cn("flex items-center gap-1", className)}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          className="font-black text-foreground"
          style={{ fontSize: "inherit", lineHeight: 1 }}
          initial={{ 
            opacity: 0, 
            y: 40,
            rotateX: -90,
          }}
          animate={{ 
            opacity: 1, 
            y: 0,
            rotateX: 0,
          }}
          transition={{
            duration: calc(0.6),
            delay: calc(letter.delay),
            ease: [0.16, 1, 0.3, 1],
          }}
          onAnimationComplete={
            index === letters.length - 1 ? onAnimationComplete : undefined
          }
        >
          {letter.char}
        </motion.span>
      ))}
    </motion.div>
  );
}
