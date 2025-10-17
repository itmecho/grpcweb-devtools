import { useAtom, useAtomValue } from "jotai";
import { entriesAtom, selectedEntryAtom, type Entry } from "../state/entries";
import classNames from "classnames";
import { settingsAtom } from "../state/settings";
import { formatDateToTime } from "../utils/date";
import { useState } from "react";

export function EntryList() {
  const { reverseList } = useAtomValue(settingsAtom);
  const entries = useAtomValue(entriesAtom);
  const [filter, setFilter] = useState("");
  const sortedList = reverseList ? entries.slice().reverse() : entries;
  const entryList =
    filter.length > 0
      ? sortedList.filter((e) => !e.method || e.method.includes(filter))
      : sortedList;
  const [selectedEntry, setSelectedEntry] = useAtom(selectedEntryAtom);

  return (
    <div className="h-full min-w-3xs w-10 resize-x border-r-2 border-slate-400 dark:border-slate-600 max-h-full overflow-y-auto">
      <input
        className="w-full px-4 py-2 dark:bg-slate-700"
        placeholder="Filter..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
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
