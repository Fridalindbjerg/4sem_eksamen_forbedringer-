"use client";
import { useState } from "react";
import Image from "next/image";

type Props = {
  pics: string[];
};

export default function ImageGallery({ pics }: Props) {
  // Holder styr på hvilket billede der vises i det store felt – starter med det første billede
  const [activeImage, setActiveImage] = useState(pics[0]);

  return (
    <div className="flex gap-2 flex-row">
      {/* Det store aktive billede */}
      <figure className="relative flex-1 max-h-[80vh] aspect-3/4 overflow-hidden">
        <Image
          // Viser det aktive billede i stor størrelse
          src={activeImage}
          fill
          className="object-cover"
          alt="Aktivt billede"
        />
      </figure>

      {/* Liste af thumbnails – klikker man på et, skifter det store billede */}
      <div className="flex flex-col gap-2">
        {pics.map((img) => (
          <button
            key={img}
            onClick={() => setActiveImage(img)}
            // gør at det aktive billede vises med fuld opacity – resten er let gennemsigtige
            className={activeImage === img ? "opacity-100" : "opacity-75"}
          >
            <Image src={img} width={150} height={100} alt="Thumbnail" />
          </button>
        ))}
      </div>
    </div>
  );
}
