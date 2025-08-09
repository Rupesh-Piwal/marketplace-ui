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
    <div className="min-h-screen bg-[#121212] text-white p-4 max-w-7xl m-auto">

      <section className="mb-8">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.02] p-6 backdrop-blur-md">
          <div className="pointer-events-none absolute -inset-24 bg-[radial-gradient(600px_200px_at_10%_-10%,rgba(255,42,95,0.12),transparent_60%),radial-gradient(400px_160px_at_90%_-10%,rgba(255,106,0,0.12),transparent_60%)]" />
          <div className="relative z-10">
            <h1 className="text-2xl font-semibold text-white md:text-3xl">
              Subtitle Template Marketplace
            </h1>
            <p className="mt-2  text-white/70">
              Premium subtitle styles crafted for editorial, cyber, and luxe
              vibes. <br /> Pay with credits. Instant apply.
            </p>
          </div>
        </div>
      </section>
      
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
