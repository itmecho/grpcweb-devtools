import { useSetAtom } from "jotai";
import { HiMiniTrash } from "react-icons/hi2";
import { entriesAtom, selectedEntryAtom } from "../state/entries";
import { settingsAtom, type Settings } from "../state/settings";

export function Toolbar() {
  const setSettings = useSetAtom(settingsAtom);
  const setEntries = useSetAtom(entriesAtom);
  const setSelectedEntry = useSetAtom(selectedEntryAtom);
  const clearEntries = () => {
    setSelectedEntry(undefined);
    setEntries([]);
  };
  return (
    <div className="flex items-center gap-4 px-4 py-1 border-b-2 border-slate-600">
      <button
        className="p-1 cursor-pointer rounded-full hover:bg-gray-700"
        onClick={() => clearEntries()}
      >
        <HiMiniTrash />
      </button>
      <label>
        Output view:
        <select
        className="ml-2 p-1 border-2 rounded border-slate-600"
          onChange={(e) =>
            setSettings((prev: Settings) => ({
              ...prev,
              outputView: e.target.value as Settings["outputView"],
            }))
          }
        >
          <option value="json">JSON</option>
          <option value="tabbed">Tabbed</option>
        </select>
      </label>
    </div>
  );
}
