import { atom } from "jotai";

export type Settings = {
  outputView: "json" | "tabbed";
  reverseList: boolean;
};

export const settingsAtom = atom<Settings>({
  outputView: "json",
  reverseList: false,
} satisfies Settings);
