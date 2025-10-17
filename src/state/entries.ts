import { atom } from "jotai";

export type Entry = {
  id: string;
  timestamp: Date;
  method?: string;
  request?: Record<string, unknown>;
  response?: Record<string, unknown>;
  error?: Error;
};

const fakeObj = Array.from(Array(20).keys()).reduce<Record<string, string>>(
  (obj, i) => {
    obj[`field${i}`] = "some value";
    return obj;
  },
  {},
);

export const entriesAtom = atom<Entry[]>(
  import.meta.env.DEV
    ? Array.from(Array(10).keys()).map((i) => ({
        id: `id-${i}`,
        timestamp: new Date(),
        method: `https://api.example.com/some.package.Service/ExampleMethod${i}`,
        request: fakeObj,
        response: fakeObj,
      }))
    : [],
);

export const selectedEntryAtom = atom<Entry | undefined>(undefined);
