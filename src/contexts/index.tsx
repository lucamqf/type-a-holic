import { GameProvider } from "@/contexts/gameContext";
import { LanguageProvider } from "@/contexts/languageProvider";
import { ThemeProvider } from "@/contexts/themeProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <GameProvider>{children}</GameProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}
