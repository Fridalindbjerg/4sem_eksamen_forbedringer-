
import { getCases } from "@/lib/cases";
import CaseItem from "./components/case_item";
import CasesNav from "./components/case_nav";
import GlobalH1Section from "../global_components/global-h1-section";
import { getTranslations } from "next-intl/server";

export default async function CasesPage() {
  const cases = await getCases();
  const t = await getTranslations("cases");

  return (
    // <main className="full-bleed grid grid-cols-subgrid">
    //   <section className="content grid grid-cols-subgrid">
    //     <GlobalH1Section title={t("title")} />
    //     {/* Navigation — skjult på mobil */}
    //     <CasesNav cases={cases} />

    //     {cases.map((caseItem) => (
    //       <CaseItem key={caseItem.id} caseItem={caseItem}/>
    //     ))}
    //   </section>
    // </main>

        <main className="full-bleed grid grid-cols-subgrid">

        <GlobalH1Section title={t("title")} />
        {/* Navigation — skjult på mobil */}
        <CasesNav cases={cases} />

        {cases.map((caseItem, index) => (
          <CaseItem key={caseItem.id} caseItem={caseItem} isFirst={index === 0}/>
        ))}

    </main>
  );
}
