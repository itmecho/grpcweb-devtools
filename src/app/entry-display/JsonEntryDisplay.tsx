import type { Entry } from "../../state/entries";
import { JsonDisplay } from "../../components/JsonDisplay";

export function JsonEntryDisplay({ entry }: { entry: Entry }) {
  const src = {
    method: entry.method ? entry.method : null,
    duration: entry.duration ? entry.duration : null,
    request: entry.request ? entry.request : null,
    response: entry.response ? entry.response : null,
  };
  return <JsonDisplay src={src} />;
}
