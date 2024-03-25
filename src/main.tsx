import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Providers } from "./contexts/index.tsx";
import "./styles/global.css";
import "./lib/i18n";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>
);
