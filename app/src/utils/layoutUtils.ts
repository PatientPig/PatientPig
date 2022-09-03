import Layout, { Position } from "@src/interface/Layout";

export const getCenterPosition = ({ x, y, height, width }: Layout): Position => {
  "worklet";

  return {
    x: x + Math.floor(width / 2),
    y: y + Math.floor(height / 2),
  };
};
