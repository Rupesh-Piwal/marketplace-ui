import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Toaster } from "react-hot-toast";


import "@fontsource/space-grotesk";
import "@fontsource/space-grotesk/700.css"; 

import App from "./App.tsx";
import { CartProvider } from "./context/CartContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CartProvider>
      <App />
      <Toaster position="top-right" reverseOrder={false} />
    </CartProvider>
  </StrictMode>
);
