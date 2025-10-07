import { useAtom, useAtomValue } from "jotai";
import { entriesAtom, selectedEntryAtom, type Entry } from "../state/entries";
import classNames from "classnames";
import { settingsAtom } from "../state/settings";
import { formatDateToTime } from "../utils/date";

export function EntryList() {
  const { reverseList } = useAtomValue(settingsAtom);
  const entries = useAtomValue(entriesAtom);
  const entryList = reverseList ? entries.slice().reverse() : entries;
  const [selectedEntry, setSelectedEntry] = useAtom(selectedEntryAtom);
  return (
    <div className="h-full min-w-3xs w-10 resize-x border-r-2 border-slate-400 dark:border-slate-600 max-h-full overflow-y-auto">
      {entryList.map((e) => (
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
  const method = entry.method.split("/").at(-1) ?? "ERR: unknown";
  return (
    <button
      className={classNames(
        "w-full flex items-center justify-between px-2 py-1 border-b-2 border-slate-400 dark:border-slate-600 text-left cursor-pointer hover:bg-slate-300 dark:hover:bg-slate-700",
        isSelected && "bg-slate-400 dark:bg-slate-700",
      )}
      onClick={onClick}
    >
      <p>
        {isSelected && "> "}
        {method}
      </p>
      <p className="dark:text-slate-500">{formatDateToTime(entry.timestamp)}</p>
    </button>
  );
}
