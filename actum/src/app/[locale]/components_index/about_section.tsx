import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import CTAButtonDiscrete from "../(routes)/global_components/cta_button_discrete";

// Server component — henter oversættelser på serversiden
export default async function AboutSection() {
  const t = await getTranslations("about_section");

  return (
    <section className="content ">
      {/* OBS PADDING ER TILFØJET SÅ JEG KUNNE SE SEKTIONEN ORDENTLIGT */}
      <div className="grid grid-cols-1 md:grid-cols-2 py-16 gap-y-16">
        {/* Venstre kolonne — billede */}
        <div className="flex items-center justify-center">
          <div className="relative w-1/3 aspect-3/4">
            <Image
              src="/assets/index/about_dummy.jpg"
              alt=""
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Højre kolonne — tekst, adresse og CTA */}
        <div className="flex flex-col justify-between gap-y-16">
          <p className="indent-20">{t("text")}</p>

          <div className="flex justify-between items-end">
            <p className="font-ocr">
              {t("address")}
              <br />
              {t("city")}
            </p>
            <CTAButtonDiscrete href="/about" label={t("link")} />
          </div>
        </div>
      </div>
    </section>
  );
}
