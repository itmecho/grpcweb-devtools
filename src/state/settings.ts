import { atomWithStorage } from "jotai/utils";

export type Settings = {
  theme: "auto" | "light" | "dark";
  outputView: "json" | "tabbed";
  reverseList: boolean;
};

export const settingsAtom = atomWithStorage<Settings>("settings", {
  theme: "dark",
  outputView: "json",
  reverseList: false,
} satisfies Settings);
