"use client";

import { motion } from "framer-motion";

// props til at animere 
type Props = {
  children: React.ReactNode; // det indhold der skal animeres
  delay: number; // forsinkelse før animationen starter
  className?: string;
};

export default function AnimatedText({ children, delay, className }: Props) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, ease: "easeInOut", delay }} className={className}>
      {children}
    </motion.div>
  );
}
