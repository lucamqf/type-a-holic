import { GameProvider } from "./gameContext";
import { ThemeProvider } from "./themeProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <GameProvider>{children}</GameProvider>
    </ThemeProvider>
  );
}
