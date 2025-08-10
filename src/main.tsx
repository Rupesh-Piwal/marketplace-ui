import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

// Font imports
import "@fontsource/space-grotesk"; // Defaults to weight 400
import "@fontsource/space-grotesk/700.css"; // Optional extra weight

import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
