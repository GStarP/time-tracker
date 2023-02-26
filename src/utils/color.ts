import { COLOR_PRIMARY } from "../styles/const";

/**
 * 0: #2196F3
 */
export const ColorList = [COLOR_PRIMARY];

export function color(colorCode: number): string | null {
  return colorCode >= 0 && colorCode < ColorList.length
    ? ColorList[colorCode]
    : null;
}
