import type { Entry } from "../../state/entries";
import { JsonDisplay } from "../../components/JsonDisplay";

export function JsonEntryDisplay({ entry }: { entry: Entry }) {
  const src = {
    method: entry.method ? entry.method : null,
    request: entry.request ? entry.request : null,
    response: entry.response ? entry.response : null,
  };
  return (
    <div className="w-full max-h-full overflow-y-auto">
      <JsonDisplay src={src} />
    </div>
  );
}
