import { Header } from "./components/header";
import { Providers } from "./contexts";
import { TimedTyping } from "./pages/timedTyping";

function App() {
  return (
    <Providers>
      <div className="flex h-screen w-screen flex-col items-center justify-center bg-neutral-900">
        <Header />
        <TimedTyping />
      </div>
    </Providers>
  );
}

export default App;
