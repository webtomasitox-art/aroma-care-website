import Image from "next/image";
import Link from "next/link";

interface CategoryCardProps {
  title: string;
  titleEn: string;
  description: string;
  image: string;
  href: string;
}

export function CategoryCard({ title, titleEn, description, image, href }: CategoryCardProps) {
  return (
    <Link
      href={href}
      className="group relative block rounded-xl overflow-hidden bg-charcoal aspect-[4/5]"
    >
      <Image
        src={image}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover opacity-70 transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent" />
      <div className="absolute bottom-0 right-0 left-0 p-6">
        <p className="font-heading text-2xl text-cream">{title}</p>
        <p className="ltr-inline font-accent italic text-sm text-amber-gold/90 mt-1">{titleEn}</p>
        <p className="font-body text-xs text-cream/70 mt-2 max-w-[80%]">{description}</p>
      </div>
    </Link>
  );
}
