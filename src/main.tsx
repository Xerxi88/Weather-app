import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./config/i18n.js";
import { DarkModeProvider } from "./context/DarkModeContext.tsx";

createRoot(document.getElementById("root")!).render(
  <DarkModeProvider>
    <App />
  </DarkModeProvider>
);
