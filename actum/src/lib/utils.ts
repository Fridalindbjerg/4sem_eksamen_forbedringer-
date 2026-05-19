// Liste af mulige billedformater der roterer igennem når produkter vises i et grid.
// Ved at have forskellige formater undgår vi at alle billeder ser ens ud.
const aspectRatios = [
  "aspect-[3/4]",
  "aspect-[4/3]",
  "aspect-square",
  "aspect-[2/3]",
  "aspect-[16/9]",
];

// Returnerer et billedformat baseret på produktets id.
// % sikrer at vi aldrig går ud over listens længde – når vi når slutningen starter vi forfra.
// Et produkt med id 6 får samme format som id 1, id 7 samme som id 2 og så videre.
export const getAspectRatio = (id: number) =>
  aspectRatios[id % aspectRatios.length];
