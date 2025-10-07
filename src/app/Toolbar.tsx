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
    <div className="h-[var(--toolbar-height)] px-4 py-1 flex items-center justify-between border-b-2 border-slate-400 dark:border-slate-600">
      <div className="flex items-center h-full">
        <button
          className="p-1 cursor-pointer rounded-full hover:bg-slate-400 dark:hover:bg-slate-700"
          onClick={() => clearEntries()}
          title="Clear all entries"
        >
          <HiMiniTrash />
        </button>
        <Spacer />
        <label>Output view:</label>
        <select
          className="ml-2 text-xs cursor-pointer"
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
        <label htmlFor="reverseList">Reverse list:</label>
        <input
          id="reverseList"
          name="reverseList"
          className="ml-2 cursor-pointer"
          type="checkbox"
          checked={settings.reverseList}
          onChange={() =>
            setSettings((prev) => ({
              ...prev,
              reverseList: !prev.reverseList,
            }))
          }
        />
      </div>
      <div>
        <label htmlFor="theme">Theme:</label>
        <select
          id="theme"
          name="theme"
          className="ml-2 text-xs cursor-pointer"
          onChange={(e) =>
            setSettings((prev) => ({
              ...prev,
              theme: e.target.value as Settings["theme"],
            }))
          }
          value={settings.theme}
        >
          <option value="auto">Auto</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
    </div>
  );
}

function Spacer() {
  return <div className="mx-4 h-[90%] border-l-2 border-slate-400 dark:border-slate-600"></div>;
}
