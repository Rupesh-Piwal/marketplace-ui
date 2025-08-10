import React from "react";
import { useCart } from "../../context/CartContext";
import { ShoppingCart, Trash2 } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MobileCartDrawer = ({ open, setOpen }: Props) => {
  const { cart, credits, removeFromCart, checkout, setIsCartOpen } = useCart();
  const totalCost = cart.reduce((sum, t) => sum + t.cost, 0);
  const disabled = cart.length === 0 || totalCost > credits;


  const handleOpenChange = (isOpen: boolean) => {
    if (window.innerWidth < 768) {
      setIsCartOpen(isOpen);
      setOpen(isOpen);
    } else {
      
      if (!isOpen) {
        setIsCartOpen(false);
        setOpen(false);
      }
    }
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[70vh] border-t border-white/10 bg-[#121212]/95 text-white backdrop-blur-xl"
      >
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Your Cart
          </SheetTitle>
        </SheetHeader>

        <div className="mt-4 flex h-[calc(70vh-7rem)] flex-col">
          <ScrollArea className="flex-1 rounded-md border border-white/10">
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

          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/70">Total</span>
              <span className="text-white font-semibold">
                {totalCost} credits
              </span>
            </div>
            <Button
              disabled={disabled}
              onClick={() => {
                checkout();
                setOpen(false);
              }}
              className={cn(
                "w-full text-white",
                disabled
                  ? "bg-white/10 border-white/20"
                  : "bg-gradient-to-r from-[#0fa36b] to-[#0f9d58] hover:from-[#13bf7d] hover:to-[#11aa60] shadow-[0_0_16px_rgba(19,191,125,0.35)]"
              )}
            >
              Checkout
            </Button>
            <div className="text-xs text-white/60">
              Available:{" "}
              <span className="text-white font-medium">{credits}</span> credits
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
