import { atom } from "jotai";

export const HeaderStore = {
  title: atom(""),
  titleAppend: atom<JSX.Element | null>(null),
  actions: atom<JSX.Element | null>(null),
};
