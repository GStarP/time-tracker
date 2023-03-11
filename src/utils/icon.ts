import { ICON_OTHER } from "../styles/const";

/**
 * 0: 'help-circle'
 */
export const IconList = [ICON_OTHER];

export function icon(iconCode: number): string {
  if (iconCode < 0 && iconCode > IconList.length)
    throw new Error("[utils/icon.ts] illegal iconCode");
  return IconList[iconCode];
}
