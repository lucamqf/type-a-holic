import { useLanguage } from "@/contexts/languageProvider";
import { IconButton } from "@/components/ui/iconButton";

export function LanguageSelector() {
  const { setLanguage } = useLanguage();

  return (
    <div className="flex h-10 w-fit items-center gap-x-4 self-end rounded-t-xl bg-background-200 bg-opacity-30 px-4">
      <IconButton
        className="p-0 hover:border-transparent"
        onClick={() => setLanguage("pt")}
      >
        <img className="aspect-square w-4" src="icons/brazil-flag.png" />
      </IconButton>
      <IconButton
        className="p-0 hover:border-transparent"
        onClick={() => setLanguage("en")}
      >
        <img className="aspect-square w-4" src="icons/usa-flag.png" />
      </IconButton>
      <IconButton
        className="p-0 hover:border-transparent"
        onClick={() => setLanguage("es")}
      >
        <img className="aspect-square w-4" src="icons/spain-flag.png" />
      </IconButton>
    </div>
  );
}
