export {};

declare global {
  type Color = {
    _id: string;
    hex: string;
    hsv: [number, number, number];
    palettes: string;
    rgb: [number, number, number];
  };
}
