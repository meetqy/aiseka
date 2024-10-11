export {};

declare global {
  type Color = {
    _id: string;
    hex: string;
    hsv: [number, number, number];
    palettes: string;
    rgb: [number, number, number];
  };

  type ColorIntroduce = {
    _id: string;
    hsv: [number, number, number];
    hsl: [number, number, number];
    name: string;
    name_en: string;
    description: string;
    meaning: string[];
    usage: string[];
    hex: string;
  };
}
