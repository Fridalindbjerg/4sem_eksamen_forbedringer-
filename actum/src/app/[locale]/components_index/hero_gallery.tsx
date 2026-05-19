"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// props med array af billed URLs
type Props = { images: string[] };

// komponent der viser op til 4 billeder i grid
export default function HeroGallery({ images }: Props) {
  if (images.length === 0) return null; // Hvis ikke der er billeder, returner null

  return (
    <div className="col-[content-start/content-end] row-[1/3] grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {images.slice(0, 4).map((url, index) => ( // tager kun de første 4 billeder
        <motion.div
          key={url}
          initial={{ opacity: 0, scale: 0 }}// ind med fade og zoom
          animate={{ opacity: 1, scale: 1 }}// til normal størrelse og fuld opacity
          transition={{ duration: 1, ease: "easeInOut", delay: index * 0.15 }} // stagger animation med delay baseret på index
          className={`relative aspect-3/4 overflow-hidden ${index >= 2 ? "hidden md:block" : ""}`}// de sidste 2 billeder skjules på mobil
        >
          <Image src={url} alt="" fill className="object-cover" />
        </motion.div>
      ))}
    </div>
  );
}
