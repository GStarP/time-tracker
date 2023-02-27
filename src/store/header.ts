import { atom } from "jotai";

export const HeaderStore = {
  title: atom(""),
  showBack: atom(false),
  actions: atom<JSX.Element | null>(null),
};
