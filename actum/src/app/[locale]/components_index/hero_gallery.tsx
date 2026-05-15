"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type Props = { images: string[] };

export default function HeroGallery({ images }: Props) {
  if (images.length === 0) return null;

  return (
    <div className="col-[content-start/content-end] row-[1/3] grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {images.slice(0, 4).map((url, index) => (
        <motion.div
          key={url}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeInOut", delay: index * 0.15 }}
          className={`relative aspect-3/4 overflow-hidden ${index >= 2 ? "hidden md:block" : ""}`}
        >
          <Image src={url} alt="" fill className="object-cover" />
        </motion.div>
      ))}
    </div>
  );
}
