import React from "react";
import { useCart } from "../../context/CartContext";
import { ShoppingCart, Trash2, X } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DesktopCartPanel = ({ open, setOpen }: Props) => {
  const { cart, credits, removeFromCart, checkout } = useCart();
  const totalCost = cart.reduce((sum, t) => sum + t.cost, 0);

  const disabled = cart.length === 0 || totalCost > credits;

  if (!open) return null;

  return (
    <aside
      aria-label="Cart panel"
      className={cn(
        "fixed right-6 top-24 z-30 flex h-[calc(100vh-8rem)] w-[360px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl transition-transform duration-300",
        open ? "translate-x-0" : "translate-x-[calc(100%+2rem)]"
      )}
    >
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5 text-white" />
          <h2 className="text-sm font-semibold text-white">Your Cart</h2>
        </div>
        <button
          aria-label="Close cart"
          onClick={() => setOpen(false)}
          className="rounded-md p-1 text-white/70 hover:bg-white/10 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <ScrollArea className="flex-1">
        <div className="divide-y divide-white/10">
          {cart.length === 0 && (
            <div className="p-6 text-center text-sm text-white/60">
              Your cart is empty.
            </div>
          )}
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between px-4 py-3"
            >
              <div>
                <div className="text-white">{item.name}</div>
                <div className="text-xs text-white/60">
                  {item.cost === 0 ? "Free" : `${item.cost} credits`}
                </div>
              </div>
              <button
                aria-label={`Remove ${item.name}`}
                onClick={() => removeFromCart(item.name)}
                className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 text-xs text-white/80 hover:bg-white/[0.08]"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Remove
              </button>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="border-t border-white/10 p-4">
        <div className="mb-3 flex items-center justify-between text-sm">
          <span className="text-white/70">Total</span>
          <span className="text-white font-semibold">{totalCost} credits</span>
        </div>
        <Button
          disabled={disabled}
          onClick={checkout}
          className={cn(
            "w-full text-white",
            disabled
              ? "bg-white/10 border-white/20"
              : "bg-gradient-to-r from-[#0fa36b] to-[#0f9d58] hover:from-[#13bf7d] hover:to-[#11aa60] shadow-[0_0_16px_rgba(19,191,125,0.35)]"
          )}
        >
          Checkout
        </Button>
        <div className="mt-2 text-xs text-white/60">
          Available: <span className="text-white font-medium">{credits}</span>{" "}
          credits
        </div>
      </div>
    </aside>
  );
};
