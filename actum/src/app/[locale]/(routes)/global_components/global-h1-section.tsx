type Props = {
  title: string;
};

export default function GlobalH1Section({ title }: Props) {
  return (
    <section className="col-[content-start/content-end] pb-6 pt-6 md:pt-0"
>
      <h1 className="font-ocr leading-none">{title}</h1>
    </section>
  );
}
