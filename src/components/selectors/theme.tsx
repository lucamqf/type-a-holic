import { useTheme } from "@/contexts/theme-provider";
import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";
import { IconButton } from "@/components/ui/icon-button";

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex h-10 w-fit items-center gap-x-4 self-end rounded-t-xl bg-background-200 bg-opacity-30 px-4">
      <IconButton
        className={cn([
          "p-0 hover:border-transparent",
          theme === "dark" && "text-accent",
        ])}
        onClick={() => setTheme("dark")}
      >
        <Moon size={16} />
      </IconButton>
      <IconButton
        className={cn([
          "p-0 hover:border-transparent",
          theme === "light" && "text-accent",
        ])}
        onClick={() => setTheme("light")}
      >
        <Sun size={16} />
      </IconButton>
    </div>
  );
}
