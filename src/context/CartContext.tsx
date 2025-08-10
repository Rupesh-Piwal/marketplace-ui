
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { Template, type TemplateType } from "../data/template";
import toast from "react-hot-toast";

interface CartContextType {
  cart: TemplateType[];
  credits: number;
  purchased: string[];
  isCartOpen: boolean;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addToCart: (id: string) => void;
  removeFromCart: (name: string) => void;
  checkout: () => void;
  toggleCart: () => void;
  openCart: () => void;
}

interface CartProviderProps {
  children: ReactNode;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<TemplateType[]>([]);
  const [credits, setCredits] = useState<number>(500);
  const [purchased, setPurchased] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  
  useEffect(() => {
    const savedCredits = localStorage.getItem("credits");
    const savedPurchased = localStorage.getItem("purchased");
    const savedCart = localStorage.getItem("cart");

    if (savedCredits) {
      setCredits(parseInt(savedCredits));
    }

    if (savedPurchased) {
      setPurchased(JSON.parse(savedPurchased));
    }

    if (savedCart) {
      try {
        const cartIds = JSON.parse(savedCart) as string[];
    
        const reconstructedCart = cartIds
          .map((id) => Template.find((t) => t.id === id))
          .filter(
            (template): template is TemplateType => template !== undefined
          );

        setCart(reconstructedCart);
      } catch (error) {
        console.warn("Failed to parse saved cart data:", error);
        localStorage.removeItem("cart");
      }
    }
  }, []);

 
  useEffect(() => {
    localStorage.setItem("credits", credits.toString());
  }, [credits]);

  useEffect(() => {
    localStorage.setItem("purchased", JSON.stringify(purchased));
  }, [purchased]);

 
  useEffect(() => {
    const cartIds = cart.map((item) => item.id);
    localStorage.setItem("cart", JSON.stringify(cartIds));
  }, [cart]);

  const addToCart = (id: string) => {
    const template = Template.find((t) => t.id === id);
    if (!template) return;

    if (purchased.includes(template.name)) {
      toast.error("You already own this template.");
      return;
    }

    if (cart.some((item) => item.id === id)) {
      // setIsCartOpen(true);
      toast("This template is already in your cart.");
      return;
    }

    setCart((prev) => [...prev, template]);
    // setIsCartOpen(true);
    toast.success("Template added to cart.");
  };

  const removeFromCart = (name: string) => {
    setCart((prev) => prev.filter((item) => item.name !== name));
    toast("Template removed from cart.");
  };

  const checkout = () => {
    const totalCost = cart.reduce((sum, t) => sum + t.cost, 0);

    if (cart.length === 0) return;

    if (totalCost > credits) {
      toast.error("Not enough credits to complete this purchase.");
      return;
    }

    const newCredits = credits - totalCost;
    setCredits(newCredits);
    setPurchased((prev) => [...prev, ...cart.map((t) => t.name)]);
    setCart([]);

    toast.success(`Purchase successful! Remaining credits: ${newCredits}`);
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
        setIsCartOpen,
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
