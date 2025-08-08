export type TemplateType = {
  id: string;
  name: string;
  cost: number;
  preview: "classic" | "backdrop" | "highlight" | "glow" | "mono";
  sampleText: string; // added
};

export const Template: TemplateType[] = [
  {
    id: "classic",
    name: "Classic",
    cost: 0,
    preview: "classic",
    sampleText: "This is a classic subtitle style.",
  },
  {
    id: "backdrop",
    name: "Backdrop",
    cost: 100,
    preview: "backdrop",
    sampleText: "Subtitles with a bold backdrop.",
  },
  {
    id: "highlight",
    name: "Highlight",
    cost: 200,
    preview: "highlight",
    sampleText: "Important words are highlighted.",
  },
  {
    id: "glow",
    name: "Glow",
    cost: 250,
    preview: "glow",
    sampleText: "Glowing text for extra emphasis.",
  },
  {
    id: "mono",
    name: "Mono",
    cost: 300,
    preview: "mono",
    sampleText: "Clean and modern monospaced text.",
  },
];
