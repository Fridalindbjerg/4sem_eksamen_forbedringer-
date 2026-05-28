import Image from "next/image";

export default function VideoSection() {
  return (
    <section className="full-bleed grid grid-cols-subgrid grid-rows-[1fr_auto] overflow-hidden max-h-[50vh]">
      <video
        src="/assets/index/hero_video.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="col-[full-start/full-end] row-[1/3] w-full h-full object-cover"
      />

      <div className="col-[full-start/2] row-[1/3] self-end justify-self-start translate-y-1/2 -translate-x-36 relative w-[32vw] max-w-130 aspect-[0.722]">  {/* aspect-[0.722] svarer til aspect-[520/720] */}
        {" "}
        <Image
          src="/assets/about/dots_big_group_white.svg"
          alt=""
          fill
          className="object-contain"
          priority
        />
      </div>
    </section>
  );
}
