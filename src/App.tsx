import { Header } from "@/components/header";
import { enGameType, useGame } from "@/contexts/game-provider";
import { Infinite } from "@/pages/infinite";
import { Survival } from "@/pages/survival";
import { Timed } from "@/pages/timed";
import { Toaster } from "@/components/ui/toaster";
import { Logo } from "./components/logo";

function App() {
  const { gameType } = useGame();

  return (
    <div className="flex h-screen w-screen justify-center bg-background-100 pt-12">
      <div className="flex max-w-[1000px] flex-col items-center gap-14">
        <Logo />

        <Header />

        <div className="h-full w-full">
          {gameType === enGameType.TIMED && <Timed />}
          {gameType === enGameType.INFINITE && <Infinite />}
          {gameType === enGameType.PERFECTION && (
            <Timed isPerfectionModeEnabled />
          )}
          {gameType === enGameType.SURVIVAL && <Survival />}
        </div>

        <Toaster />
      </div>
    </div>
  );
}

export default App;
