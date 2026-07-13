import { BotanicalLine } from "@/components/ui/BotanicalLine";

interface CategoryContentTileProps {
  line: string;
}

export function CategoryContentTile({ line }: CategoryContentTileProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center px-6 py-10 md:py-0">
      <BotanicalLine className="w-16 h-6 text-oliveDeep mb-4" />
      <p className="font-accent italic text-lg text-amber-deep leading-snug max-w-[220px]">
        {line}
      </p>
    </div>
  );
}
