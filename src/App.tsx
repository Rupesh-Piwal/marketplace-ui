import "./App.css";
import { CartProvider, useCart } from "./context/CartContext";
import { CartToggle } from "./components/Cart/CartToggle";
import { DesktopCartPanel } from "./components/Cart/DesktopCartPanel";
import { MobileCartDrawer } from "./components/Cart/MobileCartDrawer";
import Marketplace from "./pages/Marketplace";
import Header from "./components/Header";

function App() {
  const { cart, isCartOpen, setIsCartOpen } = useCart();

  return (
    <CartProvider>
      <div className="relative min-h-screen bg-[#121212] ">
        <Header />
        {/* Main marketplace */}
        <Marketplace />

        {/* Floating cart toggle button */}
        <CartToggle count={cart.length} onClick={() => setIsCartOpen(true)} />

        {/* Desktop side cart */}
        <DesktopCartPanel />

        {/* Mobile drawer cart */}
        <MobileCartDrawer />
      </div>
    </CartProvider>
  );
}

export default App;
