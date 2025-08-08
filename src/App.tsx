import "./App.css";
import { CartProvider } from "./context/CartContext";
import { CartToggle } from "./components/Cart/CartToggle";
import { DesktopCartPanel } from "./components/Cart/DesktopCartPanel";
import { MobileCartDrawer } from "./components/Cart/MobileCartDrawer";
import Marketplace from "./pages/Marketplace";
import Header from "./components/Header";

function App() {
  return (
    <CartProvider>
      <div className="app-container relative min-h-screen bg-gray-50">
        <Header />
        {/* Main marketplace */}
        <Marketplace />

        {/* Floating cart toggle button */}
        <CartToggle />

        {/* Desktop side cart */}
        <DesktopCartPanel />

        {/* Mobile drawer cart */}
        <MobileCartDrawer />
      </div>
    </CartProvider>
  );
}

export default App;
