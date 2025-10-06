import { atom } from "jotai";

export type Entry = {
  id: string;
  duration?: number;
  method?: string;
  request?: Record<string, any>; //TODO
  response?: Record<string, any>; //TODO
};

export const entriesAtom = atom<Entry[]>([]);

export const selectedEntryAtom = atom<Entry | undefined>(undefined);
