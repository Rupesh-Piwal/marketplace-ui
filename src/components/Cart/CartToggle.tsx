import React from "react";
import { useCart } from "../../context/CartContext";
import { ShoppingCart } from "lucide-react";

// Utility function for class name concatenation
const cn = (...classes: (string | undefined | false)[]): string => {
  return classes.filter(Boolean).join(" ");
};

// Two possible prop patterns
interface PropsWithCount {
  count: number;
  onClick: () => void;
}

interface PropsWithState {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

type Props = PropsWithCount | PropsWithState;

export const CartToggle = (props: Props) => {
  const { cart } = useCart();

  // Type guard to determine which props pattern is being used
  const isCountProps = (props: Props): props is PropsWithCount => {
    return "count" in props && "onClick" in props;
  };

  if (isCountProps(props)) {
    // Using count and onClick pattern
    const { count, onClick } = props;

    return (
      <button
        aria-label="Open cart"
        onClick={onClick}
        className={cn(
          "fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-full border border-white/10",
          "bg-white/[0.06] px-4 py-3 text-white backdrop-blur-xl transition-colors",
          "hover:bg-white/[0.12] focus:outline-none focus:ring-2 focus:ring-white/30",
          "shadow-[0_10px_30px_rgba(0,0,0,0.35),0_0_20px_rgba(255,42,95,0.2)]"
        )}
      >
        <ShoppingCart className="h-5 w-5" />
        <span className="text-sm font-medium">Cart</span>
        {count > 0 && (
          <span className="ml-1 inline-flex min-w-6 items-center justify-center rounded-full bg-gradient-to-br from-[#ff4d5a] to-[#ff2a5f] px-2 py-0.5 text-xs font-bold">
            {count}
          </span>
        )}
      </button>
    );
  } else {
    // Using open and setOpen pattern
    const { open, setOpen } = props;

    const handleToggle = () => {
      setOpen(!open);
    };

    return (
      <button
        aria-label={open ? "Close cart" : "Open cart"}
        onClick={handleToggle}
        className={cn(
          "fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-full border border-white/10",
          "bg-white/[0.06] px-4 py-3 text-white backdrop-blur-xl transition-colors",
          "hover:bg-white/[0.12] focus:outline-none focus:ring-2 focus:ring-white/30",
          "shadow-[0_10px_30px_rgba(0,0,0,0.35),0_0_20px_rgba(255,42,95,0.2)]"
        )}
      >
        <ShoppingCart className="h-5 w-5" />
        <span className="text-sm font-medium">{open ? "Close" : "Cart"}</span>
        {cart.length > 0 && (
          <span className="ml-1 inline-flex min-w-6 items-center justify-center rounded-full bg-gradient-to-br from-[#ff4d5a] to-[#ff2a5f] px-2 py-0.5 text-xs font-bold">
            {cart.length}
          </span>
        )}
      </button>
    );
  }
};
