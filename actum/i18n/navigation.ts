import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Opretter sprog-bevidste navigationsværktøjer baseret på vores routing-konfiguration.
// Det betyder at Link, redirect og useRouter automatisk håndterer sprog-præfixet i URL'en –
// fx bliver /products automatisk til /da/products eller /en/products afhængigt af det aktuelle sprog.
// Vi importerer og bruger disse i stedet for Next.js' egne Link og useRouter,
// så vi ikke selv skal huske at tilføje sproget til hver eneste URL i koden.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
