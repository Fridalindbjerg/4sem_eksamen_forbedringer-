import { getTeamMembers } from "@/lib/team_members";
import { getLocale } from "next-intl/server";
import Image from "next/image";

function MemberText({
  // Modtager navn, titel og beskrivelse som props og viser dem som tekst
  name,
  title,
  description,
}: {
  // Alle tre props er tekststrenge
  name: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-ocr text-[--grey]">{name}</span>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function MemberImage({
  src,
  alt,
}: {
  // Modtager en billed-url og en alternativ tekst til billedet
  src: string;
  alt: string;
}) {
  return (
    <div className="relative aspect-3/4 w-full overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 40vw"
      />
    </div>
  );
}

// Server component – henter data asynkront direkte fra databasen
export default async function TeamSection() {
  // Henter alle teammedlemmer fra databasen
  //bruger await fordi det er en server component og dataen skal være klar før siden kan rendres
  const members = await getTeamMembers();

  // Henter det aktuelle sprog
  // bruger igen await til at sikre at vi har sproget klar før vi prøver at vise det på siden
  const locale = (await getLocale()) as "da" | "en";

  return (
    // Grid der viser 2 kolonner på mobil og fylder automatisk ud fra 270px på større skærme
    <section className="content grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-8">
      {/* looper igennem alle teammedlemmer og viser deres billede og tekst */}
      {members.map((member) => (
        <article key={member.id} className="flex flex-col">
          <MemberImage src={member.image_url} alt={member.name} />
          <MemberText
            name={member.name}
            title={member.title[locale]}
            description={member.description[locale]}
          />
        </article>
      ))}
    </section>
  );
}
