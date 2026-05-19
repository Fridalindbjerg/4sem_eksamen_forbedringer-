"use client";

import Image from "next/image";
import { Product } from "@/lib/types";
import { getAspectRatio } from "@/lib/utils";
import { useState } from "react";

export default function ProductImage({
  product,
  locale,
}: {
  // Modtager et produkt og det aktuelle sprog som props
  product: Product;
  locale: "da" | "en";
}) {
  // Holder styr på om musen er over billedet. udgangspunktet er at den ikke er (false)
  const [isHovered, setIsHovered] = useState(false);

  // Tjekker om produktet har et andet billede der kan vises ved hover, og at det ikke er "null"
  const hasSecondImage = product.pics?.[1] && product.pics[1] !== "null";

  // ternary operator: viser andet billede ved hover hvis det findes – ellers vises første billede
  const imageSrc =
    isHovered && hasSecondImage ? product.pics![1] : product.pics?.[0];

  // Hvis der ingen billeder er, vises editorial_text i stedet – eller ingenting
  if (!imageSrc || imageSrc === "null") {
    return product.editorial_text ? <p>{product.editorial_text}</p> : null;
  }

  return (
    <div
      className={`relative w-full ${getAspectRatio(product.id)} overflow-hidden`}
      // Skifter til andet billede når musen er over elementet
      onMouseEnter={() => setIsHovered(true)}
      // Skifter tilbage til første billede når musen forlader elementet
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={imageSrc}
        alt={product.name[locale]}
        fill
        className="object-cover"
      />
    </div>
  );
}
