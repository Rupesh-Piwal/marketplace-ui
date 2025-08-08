import React from "react";

interface TemplatePreviewProps {
  type: string; // "Classic" | "Backdrop" | "Highlight" | "Glow" | "Mono"
  text: string;
}

export const TemplatePreview: React.FC<TemplatePreviewProps> = ({ type, text }) => {
  const getStyleClasses = () => {
    switch (type) {
      case "Classic":
        return "text-white bg-transparent";
      case "Backdrop":
        return "text-white bg-black bg-opacity-60 px-2 rounded";
      case "Highlight":
        return "text-black bg-yellow-300 px-2 rounded";
      case "Glow":
        return "text-white drop-shadow-[0_0_6px_rgba(0,255,255,0.8)]";
      case "Mono":
        return "text-green-400 font-mono bg-black px-2 rounded";
      default:
        return "text-white";
    }
  };

  return (
    <div className="w-full h-16 flex items-center justify-center bg-gray-900 rounded">
      <p className={`text-lg font-semibold ${getStyleClasses()}`}>{text}</p>
    </div>
  );
};
