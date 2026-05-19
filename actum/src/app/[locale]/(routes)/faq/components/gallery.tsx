"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { getAspectRatio } from "@/lib/utils";

type Props = {
  images: string[];
};

// Blander arrayet i tilfældig rækkefølge – bruges til at vælge hvilke billeder der vises først
function shuffle(array: string[]): string[] {
  // laver en kopi af arrayet så vi ikke ændrer på det originale
  const arr = [...array];

  //Starter bagerst i arrayet og arbejder sig fremad. Hvis der er 6 billeder starter i på 5.
  //'for' er en løkke der starter på det sidste element i arrayet og går baglæns mod det første element.
  for (let i = arr.length - 1; i > 0; i--) {
    //Vælger et tilfældigt tal mellem 0 og det nuværende index. Det er den plads vi bytter med.
    const j = Math.floor(Math.random() * (i + 1));
    //Bytter de to elementer på plads i og j med hinanden. Det er selve blandingen.
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  //returnerer det nye blandede array
  //den går arrayet igennem bagfra og bytter hvert element med et tilfældigt andet element - kaldet Fisher-Yates algoritmen
  return arr;
}

// Antal billeder der er synlige ad gangen
const VISIBLE_COUNT = 6;

// Hvor mange millisekunder der går mellem hvert billedskift
const INTERVAL = 3500;

// Returnerer et tilfældigt antal billeder der skiftes ud ad gangen – mellem 1 og 3
// vi plusser med 1 til sidst, så vi aldrig får 0, og derfor altid skifter mindst 1 billede
const getSwapCount = () => Math.floor(Math.random() * 3) + 1;

export default function FaqGallery({ images }: Props) {
  // Holder styr på hvilke billeder der vises lige nu
  const [visible, setVisible] = useState<string[]>([]);

  // Bruger useEffect til at sætte de første billeder når komponenten loader eller når images - som ligger i dependencies - ændres
  useEffect(() => {
    //starter med at tjekke om der overhovedet er billeder – hvis ikke, gør vi ikke noget
    if (!images || images.length === 0) return;
    //med shuffle funktionen blander vi billederne i tilfældig rækkefølge og vælger med slice de første 6 (visible count) til at være synlige
    //med setVisible opdaterer vi state med de valgte billeder, og det får komponenten til at vise dem
    setVisible(shuffle(images).slice(0, VISIBLE_COUNT));
  }, [images]);

  // Kører et interval der løbende bytter tilfældige billeder ud med nye fra puljen
  useEffect(() => {
    // Hvis der ikke er billeder eller ingen synlige billeder, gør vi ikke noget
    if (!images || images.length === 0 || visible.length === 0) return;

    //med setInterval starter vi en timer der kører den samme kode igen og igen med et fast tidsinterval
    const interval = setInterval(() => {
      //med setVisible opdaterer vi hvilke billeder der er synlige – vi får den tidligere værdi som argument (prev) og returnerer en ny værdi baseret på den tidligere værdi med ...prev
      setVisible((prev) => {
        const next = [...prev];

        // Puljen er alle billeder der ikke allerede vises
        const pool = images.filter((img) => !next.includes(img));
        //tjekker igen, at hvis poolen er tom, så gør vi ikke noget
        if (pool.length === 0) return prev;

        // Vælger tilfældige pladser i listen der skal skiftes ud
        // Vi laver en liste med indekserne for de synlige billeder, blander dem med sort og mathrandom og vælger et antal baseret på getSwapCount
        const indicesToReplace = [...Array(next.length).keys()]
          .sort(() => Math.random() - 0.5)
          .slice(0, getSwapCount());

        // her bytter vi så hvert valgt billede ud med et nyt fra puljen
        indicesToReplace.forEach((replaceIndex) => {
          // Hvis poolen er tom, gør vi ikke noget
          if (pool.length === 0) return;
          // Vælger et tilfældigt billede fra poolen og fjerner det samtidig fra poolen så det ikke kan vælges igen
          const newImage = pool.splice(
            Math.floor(Math.random() * pool.length),
            1,
          )[0];
          // sætter det nye billede ind på pladsen for det gamle billede i next-arrayet, som er den nye værdi for visible state
          next[replaceIndex] = newImage;
        });
        // Returnerer det nye array med de opdaterede billeder, og det får komponenten til at opdatere hvilke billeder der vises
        return next;
      });
      // INTERVAL er hvor ofte det sker, den har vi defineret ovenfor
    }, INTERVAL);

    // Rydder intervallet op når komponenten unmounter eller visible opdateres
    return () => clearInterval(interval);
    // Vi har visible og images i dependencies fordi hvis de ændrer sig, skal vi måske starte forfra med at vælge billeder eller opdatere intervallet
  }, [visible, images]);

  // Deler de synlige billeder op i to kolonner baseret på deres placering i listen
  // vi bruger ikke selve billederne til at sortere, hvorfor vi har _, men vi bruger deres index tal til at bestemme hvilken kolonne de skal i - lige indextal går i col1 og ulige indextal går i col2
  const col1 = visible.filter((_, i) => i % 2 === 0);
  const col2 = visible.filter((_, i) => i % 2 !== 0);

  // Hvis der ikke er billeder, eller ingen synlige billeder, returnerer vi null så komponenten ikke viser noget
  if (!images || images.length === 0) return null;

  return (
    <div className="col-[content-start/content-end] md:col-[content-start/3] md:row-start-2 flex flex-col md:grid md:grid-cols-2 gap-2">
      {/* Mapper over de to kolonner og viser billederne i hver kolonne. col er kolonne og colindex er indekset for kolonnen - altså måden de bliver sorteret og vist i */}
      {[col1, col2].map((col, colIndex) => (
        <div key={colIndex} className="flex flex-row md:flex-col gap-2">
          {/* Mapper over billederne i kolonnen og viser hvert billede. url er billedets url og index er dets position i kolonnen, som vi bruger til at bestemme dets aspect ratio */}
          {col.map((url, index) => (
            <div
              key={index}
              // getAspectRatio er en funktion der returnerer en className baseret på billedets position i kolonnen, så vi får en varieret og dynamisk gallerilayout
              //regnestykker sikre, at billederne får forskellige aspect ratios baseret på deres index i kolonnen, så der ikke er to billeder der har samme størrelse.
              className={`relative w-full overflow-hidden ${getAspectRatio(colIndex * 3 + index)}`}
            >
              {/* AnimatePresence gør det muligt at animere billedet ud når det skiftes, da den sørger for at beholde elementet i DOM'en indtil det er færdigt med at blive animeret */}
              <AnimatePresence mode="wait">
                {/* Hvert billede får sin url som key – det sikrer at React opfatter det som et nyt element når billedet skifter, og det derfor får animaitionen på sig */}
                <motion.div
                  key={url}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image src={url} alt="" fill className="object-cover" />
                </motion.div>
              </AnimatePresence>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
