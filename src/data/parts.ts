import type { Part } from "../types/types";

export const products: Record<string, Part[]> = {
  "Wiper & Washer": [
    {
      name: "Conventional Front Right",
      brand: "TRICO",
      partNumber: 31180,
      price: "$1.79",
      image: "tricoWiper",
    },
    {
      name: "Conventional Front Right 31-Series",
      brand: "ANCO",
      partNumber: 3118,
      price: "$2.46",
      image: "ancoWiper",
    },
    {
      name: "ICON 26A Wiper Blade",
      brand: "Bosch",
      partNumber: 2601,
      price: "$12.99",
      image: "boschWiper",
    },
    {
      name: "Latitude Water Repellency 26",
      brand: "Rain-X",
      partNumber: 2600,
      price: "$14.49",
      image: "rainxWiper",
    },
  ],
};
