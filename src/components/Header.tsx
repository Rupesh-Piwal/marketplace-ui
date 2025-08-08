import { Coins, Sparkles } from "lucide-react";
import { useCart } from "../context/CartContext";

export const Header = () => {
  const { credits } = useCart();

  return (
    <header className="sticky top-0 z-30 backdrop-blur-xl border-b border-white/10 bg-[rgba(10,10,10,0.6)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-lg bg-gradient-to-tr from-[#ff4d5a] to-[#ff2a5f] shadow-[0_0_24px_#ff2a5f4d] flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <div className="text-white">
            <div className="text-sm uppercase tracking-widest text-white/60">
              DripLink
            </div>
            <div className="text-lg font-semibold">Subtitle Templates</div>
          </div>
        </div>

        {/* Credit balance */}
        <div
          aria-live="polite"
          className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 backdrop-blur-md shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#ff6a00]/30 to-[#ff2a5f]/30 blur-[12px]" />
            <Coins className="relative z-10 h-5 w-5 text-[#ffb35c]" />
          </div>
          <span className="text-white/70 text-sm">Credits</span>
          <span className="text-white font-semibold tabular-nums">
            {credits.toLocaleString()}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
