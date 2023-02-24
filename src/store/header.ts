import { atom } from "jotai";

export const HeaderStore = {
  title: atom(""),
  actions: atom<JSX.Element | null>(null),
};
