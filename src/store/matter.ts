import { atom } from "jotai";
import { Matter } from "../data/matter";

export const MatterStore = {
  matters: atom<Matter[]>([]),
};
