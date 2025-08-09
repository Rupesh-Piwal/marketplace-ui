import React from "react";

// type TemplateType =
//   | "Classic"
//   | "Backdrop"
//   | "Highlight"
//   | "Glow"
//   | "Mono"
//   | "classic"
//   | "backdrop"
//   | "highlight"
//   | "glow"
//   | "mono";

type TemplatePreviewProps = {
  type: "classic" | "backdrop" | "highlight" | "glow" | "mono";
  text: string; // required
};

export const TemplatePreview: React.FC<TemplatePreviewProps> = ({
  type,
  text,
}) => {
  // Convert type to lowercase for consistent comparison
  const variant = type.toLowerCase();

  return (
    <div className="w-full h-16 flex items-center justify-center bg-gray-900 rounded relative">
      <div className="absolute inset-0 flex items-center justify-center p-4">
        {variant === "classic" && (
          <div className="rounded-xl bg-black/30 px-4 py-2 backdrop-blur-md border border-white/10">
            <p className="text-white text-lg md:text-xl font-medium [text-shadow:0_1px_2px_rgba(0,0,0,0.6)]">
              {text}
            </p>
          </div>
        )}

        {variant === "backdrop" && (
          <div className="rounded-lg bg-black/60 px-4 py-2 border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
            <p className="text-white text-lg md:text-xl tracking-wide">
              {text}
            </p>
          </div>
        )}

        {variant === "highlight" && (
          <div className="relative px-2 py-1">
            <span className="relative inline-block text-lg md:text-xl font-semibold text-white">
              <span className="absolute inset-x-0 -bottom-0.5 h-2 rounded-sm bg-gradient-to-r from-[#ff6a00] via-[#ff4d5a] to-[#ff2a5f] opacity-80 blur-[1px]" />
              <span className="relative">{text}</span>
            </span>
          </div>
        )}

        {variant === "glow" && (
          <div className="rounded-xl px-4 py-2">
            <p className="text-lg md:text-xl font-semibold text-[#ff3b5a] [text-shadow:0_0_12px_#ff3b5a,0_0_28px_rgba(255,59,90,0.75)] drop-shadow-[0_0_10px_rgba(255,59,90,0.5)]">
              {text}
            </p>
          </div>
        )}

        {variant === "mono" && (
          <div className="px-4 py-2">
            <p className="text-lg md:text-xl font-medium text-white/90 tracking-tight">
              <span className="border-b border-white/40 pb-0.5">{text}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
