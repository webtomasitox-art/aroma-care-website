import Image from "next/image";
import { BotanicalLine } from "@/components/ui/BotanicalLine";

interface CategoryHeroProps {
  number: string;
  titleHe: string;
  titleEn: string;
  description: string;
  image: string;
}

export function CategoryHero({ number, titleHe, titleEn, description, image }: CategoryHeroProps) {
  return (
    <section className="grid md:grid-cols-[1.1fr,1fr] gap-0 mb-20 -mx-6 md:-mx-0">
      <div className="order-2 md:order-1 flex flex-col justify-center px-6 md:px-10 py-12 md:py-0">
        <span className="font-label text-[11px] tracking-[0.25em] text-copper mb-6">
          {number} · AROMA CARE
        </span>

        <h1 className="font-accent italic text-4xl md:text-6xl text-amber-deep leading-[1.05] mb-3">
          {titleEn}
        </h1>
        <p className="font-heading text-xl md:text-2xl text-charcoal/80 mb-6">{titleHe}</p>

        <BotanicalLine className="w-24 h-8 text-oliveDeep mb-6" />

        <p className="font-body text-[15px] text-charcoal/70 leading-[1.8] max-w-sm">
          {description}
        </p>
      </div>

      <div className="order-1 md:order-2 relative aspect-[4/3] md:aspect-auto md:h-[480px] overflow-hidden bg-charcoal">
        <Image
          src={image}
          alt={titleHe}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover mix-blend-luminosity opacity-90"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-amber-deep/40 via-transparent to-transparent" />
      </div>
    </section>
  );
}
