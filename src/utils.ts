export const mapRange = (
  value: number,
  fromLow: number,
  fromHigh: number,
  toLow: number,
  toHigh: number
): number => {
  const percentage = (value - fromLow) / (fromHigh - fromLow);
  return toLow + percentage * (toHigh - toLow);
};

export const colorToRGBA = (
  color?: string
): [number, number, number, number] => {
  if (!color || typeof color !== "string") {
    return [1, 1, 1, 1];
  }

  let r = 1,
    g = 1,
    b = 1,
    a = 1;

  if (color.startsWith("rgba")) {
    const parts = color.slice(5, -1).split(",");
    [r, g, b] = parts.map((n) => parseInt(n) / 255);
    a = parseFloat(parts[3]);
  } else if (color.startsWith("rgb")) {
    const parts = color.slice(4, -1).split(",");
    [r, g, b] = parts.map((n) => parseInt(n) / 255);
  } else if (color.startsWith("#")) {
    const hex = color.slice(1);
    if (hex.length === 3) {
      r = parseInt(hex[0] + hex[0], 16) / 255;
      g = parseInt(hex[1] + hex[1], 16) / 255;
      b = parseInt(hex[2] + hex[2], 16) / 255;
    } else if (hex.length === 6) {
      r = parseInt(hex.slice(0, 2), 16) / 255;
      g = parseInt(hex.slice(2, 4), 16) / 255;
      b = parseInt(hex.slice(4, 6), 16) / 255;
    } else if (hex.length === 8) {
      r = parseInt(hex.slice(0, 2), 16) / 255;
      g = parseInt(hex.slice(2, 4), 16) / 255;
      b = parseInt(hex.slice(4, 6), 16) / 255;
      a = parseInt(hex.slice(6, 8), 16) / 255;
    }
  }

  return [r, g, b, a];
};
