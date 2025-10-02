import Image from "next/image";

export default function Hero() {
  return (
    <section className="w-full relative">
      <div className="w-full relative aspect-[8/3] md:aspect-[8/3]">
        <Image
          src="/asido-hero.png"
          alt="Asido Foundation - Mental Health Advocacy"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>
    </section>
  )
}