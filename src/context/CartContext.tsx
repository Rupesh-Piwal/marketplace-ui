/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { Template, type TemplateType } from "../data/template";

// Define the context shape
interface CartContextType {
  cart: TemplateType[];
  credits: number;
  purchased: string[];
  isCartOpen: boolean;
  addToCart: (id: string) => void;
  removeFromCart: (name: string) => void;
  checkout: () => void;
  toggleCart: () => void;
  openCart: () => void;
}

// Props for the provider
interface CartProviderProps {
  children: ReactNode;
}

// Create context with a default value
export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<TemplateType[]>([]);
  const [credits, setCredits] = useState<number>(500);
  const [purchased, setPurchased] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Load from localStorage
  useEffect(() => {
    const savedCredits = localStorage.getItem("credits");
    const savedPurchased = localStorage.getItem("purchased");
    if (savedCredits) setCredits(parseInt(savedCredits));
    if (savedPurchased) setPurchased(JSON.parse(savedPurchased));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("credits", credits.toString());
    localStorage.setItem("purchased", JSON.stringify(purchased));
  }, [credits, purchased]);

  const addToCart = (id: string) => {
    const template = Template.find((t) => t.id === id);
    if (template && !cart.find((item) => item.id === id)) {
      setCart((prev) => [...prev, template]);
    }
  };

  const removeFromCart = (name: string) => {
    setCart((prev) => prev.filter((item) => item.name !== name));
  };

  const checkout = () => {
    const totalCost = cart.reduce((sum, t) => sum + t.cost, 0);
    if (totalCost > credits) {
      alert("Insufficient credits");
      return;
    }
    setCredits((prev) => prev - totalCost);
    setPurchased((prev) => [...prev, ...cart.map((t) => t.name)]);
    setCart([]);
    alert(`Purchase successful! Remaining credits: ${credits - totalCost}`);
  };

  const toggleCart = () => setIsCartOpen((prev) => !prev);
  const openCart = () => setIsCartOpen(true);

  return (
    <CartContext.Provider
      value={{
        cart,
        credits,
        purchased,
        isCartOpen,
        addToCart,
        removeFromCart,
        checkout,
        toggleCart,
        openCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
