import { useTheme } from "@/contexts/theme-provider";

export function Logo() {
  const { theme } = useTheme();

  const logo = theme === "dark" ? "/logo-dark.svg" : "/logo-light.svg";

  return (
    <img
      className="w-52"
      src={logo}
      onDragStart={(event) => event.preventDefault()}
    />
  );
}
