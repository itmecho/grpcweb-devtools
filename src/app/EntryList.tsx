import { useAtom, useAtomValue } from "jotai";
import { entriesAtom, selectedEntryAtom, type Entry } from "../state/entries";
import classNames from "classnames";

export function EntryList() {
  const entries = useAtomValue(entriesAtom);
  const [selectedEntry, setSelectedEntry] = useAtom(selectedEntryAtom);
  return (
    <div className="h-full min-w-3xs w-1/3 resize-x border-r-2 border-gray-600 overflow-y-auto">
      {entries.map((e) => (
        <ListItem
          key={e.id}
          entry={e}
          onClick={() => setSelectedEntry(e)}
          isSelected={e.id === selectedEntry?.id}
        />
      ))}
    </div>
  );
}

function ListItem({
  entry,
  onClick,
  isSelected,
}: {
  entry: Entry;
  onClick: () => void;
  isSelected: boolean;
}) {
  if (!entry.method) {
    return null;
  }
  const method = entry.method.replace(/^.+:\/\/[^/]+\//, '');
  return (
    <button
      className="block w-full text-left cursor-pointer hover:bg-slate-700"
      onClick={onClick}
    >
      <p
        className={classNames(
          "px-2 py-1 border-b-2 border-slate-600",
          isSelected && "font-bold",
        )}
      >
        {method}
      </p>
    </button>
  );
}
