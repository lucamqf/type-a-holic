import { Header } from "./components/header";
import { enGameType, useGame } from "./contexts/gameContext";
import { Infinite } from "./pages/infinite";
import { Timed } from "./pages/timed";

function App() {
  const { gameType } = useGame();

  return (
    <div className="bg-prim bg-background-100 flex h-screen w-screen flex-col items-center gap-14 pt-40">
      <Header />

      {gameType === enGameType.TIMED && <Timed />}
      {gameType === enGameType.INFINITE && <Infinite />}
      {gameType === enGameType.PERFECTION && <Timed isPerfectionModeEnabled />}
    </div>
  );
}

export default App;
