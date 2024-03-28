import { GameProvider } from "@/contexts/game-provider";
import { LanguageProvider } from "@/contexts/language-provider";
import { ThemeProvider } from "@/contexts/theme-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <GameProvider>{children}</GameProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}
