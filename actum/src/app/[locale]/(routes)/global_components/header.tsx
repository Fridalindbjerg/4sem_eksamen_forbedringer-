import { getTranslations } from "next-intl/server";
import { getLocale } from "next-intl/server";
import HeaderScroll from "./header_scroll";
import LanguageSwitch from "./language_switch";
import MobileMenu from "./header_mobile_menu";
import Link from "next/link";
import NavLink from "./nav_link";

export default async function Header() {
  const t = await getTranslations("nav");
  const locale = await getLocale();

  return (
    <HeaderScroll>
      <Link
        href="/"
        className="font-ocr text-2xl tracking-[0.04em] leading-none col-[content-start/2] md:col-[content-start/3]"
      >
        actum
      </Link>

      <nav
        aria-label={t("nav_primary")}
        className="col-[4/5] hidden lg:flex flex-col items-end font-bold text-base leading-7 tracking-wide"
      >
        <ul className="flex flex-col items-end">
          <NavLink href="/" label={t("home")} locale={locale} />
          <NavLink href="/products" label={t("products")} locale={locale} />
          <NavLink href="/cases" label={t("cases")} locale={locale} />
        </ul>
      </nav>

      <nav
        aria-label={t("nav_secondary")}
        className="col-[5/6] hidden lg:flex flex-col items-end font-bold text-base leading-7 tracking-wide"
      >
        <ul className="flex flex-col items-end">
          <NavLink href="/faq" label={t("faq")} locale={locale} />
          <NavLink href="/about" label={t("about")} locale={locale} />
          <NavLink href="/contact" label={t("contact")} locale={locale} />
        </ul>
      </nav>

      <LanguageSwitch className="col-[6/content-end] hidden lg:flex justify-end gap-1 font-bold text-base leading-7 tracking-wide" />

      <MobileMenu
        locale={locale}
        links={[
          { href: "/", label: t("home") },
          { href: "/products", label: t("products") },
          { href: "/cases", label: t("cases") },
          { href: "/faq", label: t("faq") },
          { href: "/about", label: t("about") },
          { href: "/contact", label: t("contact") },
        ]}
      />
    </HeaderScroll>
  );
}
