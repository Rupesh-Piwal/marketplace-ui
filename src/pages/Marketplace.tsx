import React from "react";

import { CartToggle } from "../components/Cart/CartToggle";

import { MobileCartDrawer } from "../components/Cart/MobileCartDrawer";
import { useCart } from "../context/CartContext";
import { TemplateCard } from "../components/Template/TemplateCard";
import { useIsMobile } from "../hooks/useIsMobile";
import { Template } from "../data/template";
import { DesktopCartPanel } from "../components/Cart/DesktopCartPanel";

export default function Marketplace() {
  const { cart } = useCart();
  const isMobile = useIsMobile();
  const [cartOpen, setCartOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-[#121212] text-white p-4">
      <h1 className="text-2xl font-bold mb-6">Subtitle Template Marketplace</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {Template.map((tpl) => (
          <TemplateCard key={tpl.id} template={tpl} />
        ))}
      </div>

      {!isMobile && <DesktopCartPanel open={cartOpen} setOpen={setCartOpen} />}
      {isMobile && <MobileCartDrawer open={cartOpen} setOpen={setCartOpen} />}
      <CartToggle count={cart.length} onClick={() => setCartOpen(true)} />
    </div>
  );
}
