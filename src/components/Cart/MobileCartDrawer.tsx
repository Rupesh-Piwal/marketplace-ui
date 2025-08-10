import React from "react";
import { useCart } from "../../context/CartContext";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MobileCartDrawer = ({ open, setOpen }: Props) => {
  const { cart, credits, removeFromCart, checkout } = useCart();
  const totalCost = cart.reduce((sum, t) => sum + t.cost, 0);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {/* Backdrop/Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={handleClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg p-4 transform transition-transform z-50 ${
          open ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Cart</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
            aria-label="Close cart"
          >
            ✖
          </button>
        </div>

        <p className="mb-4 text-sm text-gray-600">
          Credits:{" "}
          <span className="font-semibold">{credits.toLocaleString()}</span>
        </p>

        <div className="flex-1 overflow-auto max-h-96">
          {cart.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No items in cart</p>
          ) : (
            <div className="space-y-2">
              {cart.map((item) => (
                <div
                  key={item.name}
                  className="flex justify-between items-center p-2 bg-gray-50 rounded"
                >
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium truncate block">
                      {item.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 ml-2">
                    <span className="text-sm font-semibold">
                      {item.cost} credits
                    </span>
                    <button
                      onClick={() => removeFromCart(item.name)}
                      className="text-red-500 hover:text-red-700 text-xs px-2 py-1 hover:bg-red-50 rounded"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="mt-4 pt-4 border-t">
            <div className="flex justify-between items-center mb-3">
              <span className="font-semibold">Total:</span>
              <span className="font-bold text-lg">
                {totalCost.toLocaleString()} credits
              </span>
            </div>
            <button
              onClick={checkout}
              disabled={totalCost > credits}
              className={`w-full px-4 py-2 rounded font-medium transition-colors ${
                totalCost > credits
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              {totalCost > credits ? "Insufficient Credits" : "Checkout"}
            </button>
          </div>
        )}
      </div>
    </>
  );
};
