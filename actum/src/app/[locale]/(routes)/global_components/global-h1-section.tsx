type Props = {
  title: string;
};

export default function GlobalH1Section({ title }: Props) {
  return (
    <section className="col-[content-start/content-end] pb-10 ">
      <h1 className="font-ocr leading-none">{title}</h1>
    </section>
  );
}
