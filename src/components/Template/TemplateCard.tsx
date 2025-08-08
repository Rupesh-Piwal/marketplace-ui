import { TemplatePreview } from "./TemplatePreview";
import { useCart } from "../../context/CartContext";
import type { TemplateType } from "../../data/template";

interface TemplateCardProps {
  template: TemplateType;
}

export const TemplateCard = ({ template }: TemplateCardProps) => {
  const { id, name, cost, sampleText } = template;
  const { addToCart, cart, purchased } = useCart();

  const isInCart = cart.some((item) => item.id === id);
  const isPurchased = purchased.includes(name);

  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col gap-3">
      <TemplatePreview type={name} text={sampleText} />

      <div className="flex justify-between items-center">
        <h3 className="font-bold">{name}</h3>
        <span className="text-sm text-gray-600">
          {cost === 0 ? "Free" : `${cost} coins`}
        </span>
      </div>

      <button
        disabled={isPurchased || isInCart}
        onClick={() => addToCart(template)}
        className={`px-3 py-2 rounded text-white text-sm transition ${
          isPurchased
            ? "bg-green-500 cursor-not-allowed"
            : isInCart
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {isPurchased ? "Purchased" : isInCart ? "In Cart" : "Add to Cart"}
      </button>
    </div>
  );
};
