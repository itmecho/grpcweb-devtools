import { atom } from "jotai";

export type Settings = {
  outputView: "json" | "tabbed";
};

export const settingsAtom = atom<Settings>({
  outputView: "json",
} satisfies Settings);
