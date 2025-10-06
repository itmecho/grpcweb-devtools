import type { PropsWithChildren } from "react";

export function EntryDisplayMessage({ children }: PropsWithChildren) {
  return <div className="p-4">{children}</div>;
}
