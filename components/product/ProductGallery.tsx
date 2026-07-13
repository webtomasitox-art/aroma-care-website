import Image from "next/image";

interface ProductGalleryProps {
  image: string;
  alt: string;
  additionalImages?: string[];
}

export function ProductGallery({ image, alt, additionalImages }: ProductGalleryProps) {
  return (
    <div>
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-white">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain p-8"
          priority
        />
      </div>

      {additionalImages && additionalImages.length > 0 && (
        <div className="grid grid-cols-4 gap-3 mt-3">
          {additionalImages.map((img, i) => (
            <div key={i} className="relative aspect-square rounded-lg overflow-hidden bg-white">
              <Image src={img} alt={`${alt} ${i + 2}`} fill className="object-contain p-2" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
