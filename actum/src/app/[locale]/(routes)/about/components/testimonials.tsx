import { getTranslations } from "next-intl/server";
import Image from "next/image";

//bruger async fordi vi skal hente oversættelserne fra next-intl før vi kan vise dem på siden
export default async function AboutSection() {
  const t = await getTranslations("testimonials");

  return (
    <section className="section pt-12 md:pt-36 content ">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="flex items-center justify-center">
          <div className="relative w-1/3 aspect-3/4">
            <Image
              src="/assets/about/about.webp"
              alt=""
              fill
              sizes="(max-width: 768px) 33vw, 17vw" // w-1/3 af en md:grid-cols-2 kolonne
              className="object-cover pb-12"
            />
          </div>
        </div>

        <div className="flex flex-col justify-between gap-y-16">
          <p className="indent-20">{t("text")}</p>
          <p className="font-ocr">- {t("author")}</p>
        </div>
      </div>
    </section>
  );
}
