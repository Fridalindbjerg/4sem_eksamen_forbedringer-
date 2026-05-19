import { getCases } from "@/lib/cases";
import CaseItem from "./case_item";
import CasesNav from "./case_nav";

export default async function CasesContent() {
  const cases = await getCases();

  return (
    <section className="content grid grid-cols-subgrid">
      <CasesNav cases={cases} />
      {cases.map((caseItem) => (
        <CaseItem key={caseItem.id} caseItem={caseItem} />
      ))}
    </section>
  );
}
