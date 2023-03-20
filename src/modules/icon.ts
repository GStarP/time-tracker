/**
 * Icon (Ion Icons)
 */
export const ICON_OTHER = "help-circle";
export const ICON_STUDY = "school";
export const ICON_SPORT = "football";
export const ICON_GAME = "game-controller";

export const IconList = [ICON_OTHER, ICON_STUDY, ICON_SPORT, ICON_GAME];

export function icon(iconCode: number): string {
  if (iconCode < 0 && iconCode > IconList.length)
    throw new Error("[utils/icon.ts] illegal iconCode");
  return IconList[iconCode];
}
