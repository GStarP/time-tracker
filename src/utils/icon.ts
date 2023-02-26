import { ICON_OTHER } from "../styles/const";

/**
 * 0: 'help-circle'
 */
export const IconList = [ICON_OTHER];

export function icon(iconCode: number): string | null {
  return iconCode >= 0 && iconCode < IconList.length
    ? IconList[iconCode]
    : null;
}
