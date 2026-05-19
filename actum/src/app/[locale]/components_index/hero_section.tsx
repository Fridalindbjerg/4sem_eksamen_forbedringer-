import { useTranslations } from "next-intl";
import HeroGallery from "./hero_gallery";
import HeroDots from "./hero_dots";
import HeroText from "./hero_text";
import { getIndexImages } from "@/lib/index_gallery";

export default async function Hero() {
  const t = useTranslations("hero"); // Sprogvalg 
  const images = await getIndexImages(); // Henter billeder til galleriet

  return (
    <section className="full-bleed grid grid-cols-subgrid grid-rows-[auto_auto_auto_auto_auto]">
      <HeroGallery images={images} />

      <HeroText delay={1} className="content row-[2/4] self-end z-10">
        <h1 className="font-ocr text-[clamp(5rem,22vw,16.625rem)]! leading-none tracking-[0.04em]">actum</h1>
      </HeroText>

      <HeroText delay={1.4} className="content row-[4/5] self-start">
        <h2 className="font-sans! text-[clamp(2.5rem,5vw,4.6875rem)]! leading-none">{t("title")}</h2>
      </HeroText>

      <HeroText delay={1.6} className="col-[content-start/content-end] md:col-[content-start/5] row-[5/6] py-8">
        <p className="text-base indent-20">{t("text")}</p>
      </HeroText>

      <HeroDots />
    </section>
  );
}
