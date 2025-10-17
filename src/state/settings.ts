import { atomWithStorage } from "jotai/utils";

export type Settings = {
  theme: "auto" | "light" | "dark";
  outputView: "json" | "tabbed";
  reverseList: boolean;
  jsonIndent: number;
  jsonCollapsed: number;
  jsonShowArrayKeys: boolean;
  jsonShowDataTypes: boolean;
  jsonShowObjectSize: boolean;
};

export const settingsAtom = atomWithStorage<Settings>("settings", {
  theme: "dark",
  outputView: "json",
  reverseList: false,
  jsonIndent: 4,
  jsonCollapsed: 2,
  jsonShowArrayKeys: false,
  jsonShowDataTypes: false,
  jsonShowObjectSize: false,
});
