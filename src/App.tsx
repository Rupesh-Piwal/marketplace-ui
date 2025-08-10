import "./App.css";
import { useCart } from "./context/CartContext";
import { CartToggle } from "./components/Cart/CartToggle";
import { DesktopCartPanel } from "./components/Cart/DesktopCartPanel";
import { MobileCartDrawer } from "./components/Cart/MobileCartDrawer";
import Marketplace from "./pages/Marketplace";
import Header from "./components/Header";

function App() {
  const { cart, isCartOpen, setIsCartOpen } = useCart();

  return (
    <div className="relative min-h-screen bg-[#121212] ">
      <Header />
      {/* Main marketplace */}
      <Marketplace />

      {/* Floating cart toggle button */}
      <CartToggle count={cart.length} onClick={() => setIsCartOpen(true)} />

      {/* Desktop side cart */}
      <DesktopCartPanel open={isCartOpen} setOpen={setIsCartOpen} />

      {/* Mobile drawer cart */}
      <MobileCartDrawer open={isCartOpen} setOpen={setIsCartOpen} />
    </div>
  );
}

export default App;
