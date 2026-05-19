import { Suspense } from "react";
import CasesContent from "./components/case_content";
import GlobalH1Section from "../global_components/global-h1-section";
import { getTranslations } from "next-intl/server";

export default async function CasesPage() {
  const t = await getTranslations("cases");

  return (
    <main className="full-bleed grid grid-cols-subgrid">
      <GlobalH1Section title={t("title")} />
      <Suspense fallback={<p>Loading cases...</p>}>
        <CasesContent />
      </Suspense>
    </main>
  );
}
