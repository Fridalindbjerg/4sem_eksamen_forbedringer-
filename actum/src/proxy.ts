import createMiddleware from "next-intl/middleware";
import { routing } from "../i18n/routing";

// Opretter en middleware der håndterer sprog-routing for hele sitet.
// Middleware er kode der kører før en side indlæses, og kan bruges til at omdirigere brugeren baseret på forskellige betingelser – i vores kode det ønskede sprog.
// Den sørger automatisk for at brugeren sendes til den rigtige sprogversion af siden –
// fx /da/products eller /en/products – baseret på routing-konfigurationen i i18n/routing.ts
export default createMiddleware(routing);

export const config = {
  // Definerer hvilke URL'er middlewaren skal køre på.
  // Den kører på alle sider undtagen API-routes, Next.js interne filer og filer med en filendelse som .css eller .png.
  // På den måde undgår vi at middleware unødvendigt kører på statiske filer og API-kald.
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
