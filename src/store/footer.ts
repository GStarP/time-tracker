import { atom } from "jotai";

export enum FooterState {
  MATTER,
  RECORD,
  STATS,
  SETTING,
}

export const FooterStore = {
  state: atom(FooterState.MATTER),
};
