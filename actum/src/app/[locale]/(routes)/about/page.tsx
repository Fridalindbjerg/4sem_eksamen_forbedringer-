import { Suspense } from "react";
import Testimonials from "./components/testimonials";
import VideoSection from "./components/video_section";
import Team from "./components/team";
import ContactSection from "./components/contact_section";
import GlobalH1Section from "../global_components/global-h1-section";
import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations("about");

  return (
    <main className="full-bleed grid grid-cols-subgrid">
      <GlobalH1Section title={t("title")} />
      <VideoSection />
      <Testimonials />
      <Suspense fallback={<p>Loading team...</p>}>
        <Team />
      </Suspense>
      <ContactSection />
    </main>
  );
}
