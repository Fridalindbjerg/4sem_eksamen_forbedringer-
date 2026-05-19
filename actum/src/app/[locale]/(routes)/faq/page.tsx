import { Suspense } from "react";
import FaqContent from "./components/faq_content";
import { getFaqs } from "@/lib/faq";
import { getFaqImages } from "@/lib/gallery";
import GlobalH1Section from "../global_components/global-h1-section";
import { getTranslations } from "next-intl/server";

export default async function FaqPage() {
  const t = await getTranslations("faq");

  return (
    <main className="full-bleed grid grid-cols-subgrid">
      <GlobalH1Section title={t("title")} />
      <Suspense fallback={<p>Loading FAQ...</p>}>
        <FaqContent />
      </Suspense>
    </main>
  );
}
