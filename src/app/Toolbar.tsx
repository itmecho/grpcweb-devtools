import { useAtom, useSetAtom } from "jotai";
import { HiMiniTrash } from "react-icons/hi2";
import { entriesAtom, selectedEntryAtom } from "../state/entries";
import { settingsAtom, type Settings } from "../state/settings";

export function Toolbar() {
  const [settings, setSettings] = useAtom(settingsAtom);
  const setEntries = useSetAtom(entriesAtom);
  const setSelectedEntry = useSetAtom(selectedEntryAtom);
  const clearEntries = () => {
    setSelectedEntry(undefined);
    setEntries([]);
  };
  return (
    <div className="flex items-center px-4 py-1 border-b-2 border-slate-600 h-[var(--toolbar-height)]">
      <button
        className="p-1 cursor-pointer rounded-full hover:bg-gray-700"
        onClick={() => clearEntries()}
      >
        <HiMiniTrash />
      </button>
      <Spacer />
      <label>Output view:</label>
      <select
        className="ml-2 p-1 border-2 rounded border-slate-600"
        onChange={(e) =>
          setSettings((prev) => ({
            ...prev,
            outputView: e.target.value as Settings["outputView"],
          }))
        }
        value={settings.outputView}
      >
        <option value="json">JSON</option>
        <option value="tabbed">Tabbed</option>
      </select>
      <Spacer />
      <label>Reverse list:</label>
      <input
        className="ml-2"
        type="checkbox"
        checked={settings.reverseList}
        onChange={() =>
          setSettings((prev) => ({ ...prev, reverseList: !prev.reverseList }))
        }
      />
    </div>
  );
}

function Spacer() {
  return <div className="mx-4 h-[90%] border-l-2 border-slate-600"></div>;
}
