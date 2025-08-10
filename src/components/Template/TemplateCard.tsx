import { TemplatePreview } from "./TemplatePreview";
import { useCart } from "../../context/CartContext";
import { type TemplateType } from "../../data/template";
import { CheckCircle2, ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";

interface TemplateCardProps {
  template: TemplateType;
}

export const TemplateCard = ({ template }: TemplateCardProps) => {
  const costLabel = (cost: number) => (cost === 0 ? "Free" : `${cost} credits`);
  const { addToCart, cart, purchased, openCart } = useCart();

  const isPremium = template.cost > 0;
  const isPurchased = purchased.includes(template.name);
  const isInCart = cart.some((item) => item.id === template.id);

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-md",
        "transition-all duration-300 hover:shadow-[0_10px_40px_rgba(255,42,95,0.15)] hover:-translate-y-0.5"
      )}
    >
      {/* Badges */}
      <div className="absolute left-3 top-3 z-20 flex gap-2">
        {isPremium && (
          <Badge
            variant="secondary"
            className="bg-gradient-to-r from-[#ff4d5a] to-[#ff2a5f] text-white border-none shadow-[0_0_12px_rgba(255,42,95,0.35)]"
          >
            Premium
          </Badge>
        )}
        {isPurchased && (
          <Badge
            className="bg-white/10 text-white border-white/20 backdrop-blur-md"
            variant="secondary"
          >
            Purchased
          </Badge>
        )}
      </div>

      {/* Preview */}
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-white/10 bg-black/40">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute inset-0 opacity-60 transition-opacity duration-300 group-hover:opacity-80">
          <div className="absolute -inset-24 bg-[radial-gradient(400px_200px_at_30%_0%,rgba(255,42,95,0.12),transparent_60%),radial-gradient(400px_200px_at_80%_100%,rgba(255,106,0,0.1),transparent_60%)]" />
        </div>

        <TemplatePreview type={template.preview} text={template.sampleText} />
      </div>

      {/* Meta + CTAs */}
      <div className="mt-4 flex items-end justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-white">
            {template.name}
          </h3>
          <p
            className={cn(
              "text-sm",
              template.cost === 0 ? "text-emerald-300" : "text-white/70"
            )}
          >
            {costLabel(template.cost)}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isInCart && !isPurchased ? (
            <Button
              variant="outline"
              className="border-white/20 bg-white/[0.02] text-white hover:bg-white/[0.06]"
              onClick={openCart}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              In cart
            </Button>
          ) : (
            <Button
              disabled={isPurchased}
              onClick={() => addToCart(template.id)}
              className={cn(
                "relative overflow-hidden text-white",
                isPurchased
                  ? "bg-white/10 border-white/20 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#ff4d5a] to-[#ff2a5f] hover:from-[#ff6a70] hover:to-[#ff476e] shadow-[0_0_16px_rgba(255,42,95,0.35)]"
              )}
            >
              {isPurchased ? (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4" /> Purchased
                </>
              ) : (
                <>
                  <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </article>
  );
};
