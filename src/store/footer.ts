import { atom } from "jotai";

export enum FooterState {
  MATTER_OR_TARGET,
  RECORD,
  STATS,
  SETTING,
}

export const FooterStore = {
  state: atom(FooterState.MATTER_OR_TARGET),
};
