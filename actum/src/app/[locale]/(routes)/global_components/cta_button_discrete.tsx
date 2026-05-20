import Link from "next/link";

type Props = {
  label: string;
  href: string;
  className?: string;
};

export default function CTAButtonDiscrete({ label, href, className }: Props) {
  return (
    <Link href={href} className={`cursor-pointer inline-block text-sm tracking-widest text-(--almost-black) hover:text-base transition-all duration-200 ${className ?? ""}`}>
      {label} →
    </Link>
  );
}
