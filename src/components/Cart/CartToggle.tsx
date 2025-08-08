import React from "react";
import { useCart } from "../../context/CartContext";

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
        onClick={onClick}
        className={`fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg transition-all duration-200 transform hover:scale-105 hover:bg-blue-700 ${
          count > 0 ? "animate-pulse" : ""
        }`}
        aria-label="Open cart"
      >
        <span className="flex items-center gap-1">
          🛒
          {count > 0 && (
            <span className="bg-white text-gray-800 text-xs rounded-full min-w-5 h-5 flex items-center justify-center font-bold">
              {count}
            </span>
          )}
        </span>
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
        onClick={handleToggle}
        className={`fixed bottom-4 right-4 px-4 py-2 rounded-full shadow-lg transition-all duration-200 transform hover:scale-105 ${
          open
            ? "bg-red-600 hover:bg-red-700 text-white"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        } ${cart.length > 0 ? "animate-pulse" : ""}`}
        aria-label={open ? "Close cart" : "Open cart"}
      >
        <span className="flex items-center gap-1">
          {open ? "✖" : "🛒"}
          {cart.length > 0 && (
            <span className="bg-white text-gray-800 text-xs rounded-full min-w-5 h-5 flex items-center justify-center font-bold">
              {cart.length}
            </span>
          )}
        </span>
      </button>
    );
  }
};
