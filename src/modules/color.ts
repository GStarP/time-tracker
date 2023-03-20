import { COLOR_PRIMARY } from "../styles/const";

export const COLOR_ICON_DEFAULT = "#744E20";
export const COLOR_QING = "#54BCBD";
export const COLOR_RED = "#BD3124";

export const ColorList = [
  COLOR_ICON_DEFAULT,
  COLOR_PRIMARY,
  COLOR_QING,
  COLOR_RED,
];

export function color(colorCode: number): string {
  if (colorCode < 0 || colorCode > ColorList.length)
    throw new Error("[utils/color.ts] illegal colorCode");
  return ColorList[colorCode];
}
