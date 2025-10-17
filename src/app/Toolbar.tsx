import { useAtom, useSetAtom } from "jotai";
import { HiMiniTrash, HiCog6Tooth } from "react-icons/hi2";
import { entriesAtom, selectedEntryAtom } from "../state/entries";
import { settingsAtom, type Settings } from "../state/settings";
import { useEffect, useRef } from "react";
import type { IconType } from "react-icons";

export function Toolbar() {
  const setEntries = useSetAtom(entriesAtom);
  const setSelectedEntry = useSetAtom(selectedEntryAtom);
  const clearEntries = () => {
    setSelectedEntry(undefined);
    setEntries([]);
  };
  const dialogRef = useRef<HTMLDialogElement>(null);
  const advancedRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: PointerEvent) => {
      if (e.target && !advancedRef.current?.contains(e.target as Node)) {
        dialogRef.current?.close();
      }
    };
    document.addEventListener("click", handler, true);
    return () => document.removeEventListener("click", handler, true);
  }, []);

  return (
    <div
      className="
        relative
        h-[var(--toolbar-height)]
        min-h-[var(--toolbar-height)]
        max-h-[var(--toolbar-height)]
        px-4
        py-1
        flex
        items-center
        justify-between
        border-b-2
        border-slate-400
        dark:border-slate-600
      "
    >
      <div className="flex items-center h-full">
        <IconButton
          Icon={HiMiniTrash}
          onClick={() => clearEntries()}
          title="Clear all entries"
        />
        <Spacer />
        <StringChoiceSetting
          label="View"
          setting="outputView"
          options={[
            { text: "JSON", value: "json" },
            { text: "Tabbed", value: "tabbed" },
          ]}
        />
        <Spacer />
        <BoolSetting label="Reverse list" setting="reverseList" />
      </div>
      <div className="h-full flex items-center">
        <StringChoiceSetting
          label="Theme"
          setting="theme"
          options={[
            { text: "Auto", value: "auto" },
            { text: "Light", value: "light" },
            { text: "Dark", value: "dark" },
          ]}
        />
        <Spacer />
        <IconButton
          Icon={HiCog6Tooth}
          title="Show advanced settings"
          onClick={() => dialogRef.current?.show()}
        />
      </div>
      <dialog ref={dialogRef} className="z-10">
        <div className="fixed inset-0">
          <div
            className="
              absolute
              top-12
              right-4
              flex
              flex-col
              items-end
              gap-2
              p-4
              rounded
              bg-slate-300
              border-2
              border-slate-500
            "
            ref={advancedRef}
          >
            <p className="w-full font-bold border-b-2 border-slate-500">JSON display</p>
            <NumberSetting label="Indentation" setting="jsonIndent" max={8} />
            <NumberSetting
              label="Collapsed level"
              setting="jsonCollapsed"
              max={8}
            />
            <BoolSetting label="Show array keys" setting="jsonShowArrayKeys" />
            <BoolSetting label="Show data types" setting="jsonShowDataTypes" />
            <BoolSetting
              label="Show object size"
              setting="jsonShowObjectSize"
            />
          </div>
        </div>
      </dialog>
    </div>
  );
}

function IconButton({
  Icon,
  title,
  onClick,
}: {
  Icon: IconType;
  title: string;
  onClick: () => void;
}) {
  return (
    <button
      className="p-1 cursor-pointer rounded-full hover:bg-slate-400 dark:hover:bg-slate-700"
      onClick={() => onClick()}
      title={title}
    >
      <Icon />
    </button>
  );
}

function Spacer() {
  return (
    <div className="mx-4 h-[90%] border-l-2 border-slate-400 dark:border-slate-600"></div>
  );
}

type TypedKeys<T, VT> = {
  [K in keyof T]: T[K] extends VT ? K : never;
}[keyof T];

function BoolSetting({
  label,
  setting,
}: {
  label: string;
  setting: TypedKeys<Settings, boolean>;
}) {
  const [settings, setSettings] = useAtom(settingsAtom);
  return (
    <label className="flex items-center gap-2">
      {label}:
      <input
        type="checkbox"
        className="bg-slate-100 rounded"
        checked={settings[setting]}
        onChange={() =>
          setSettings((prev) => ({
            ...prev,
            [setting]: !settings[setting],
          }))
        }
      />
    </label>
  );
}

function NumberSetting({
  setting,
  label,
  min = 1,
  max,
}: {
  label: string;
  setting: TypedKeys<Settings, number>;
  min?: number;
  max?: number;
}) {
  const [settings, setSettings] = useAtom(settingsAtom);
  return (
    <label className="flex items-center gap-2">
      {label}:
      <input
        type="number"
        className="max-w-24 bg-slate-100 rounded"
        value={settings[setting]}
        min={min}
        max={max}
        onChange={(e) =>
          setSettings((prev) => ({
            ...prev,
            [setting]: parseInt(e.target.value),
          }))
        }
      />
    </label>
  );
}

type ChoiceOption = {
  text: string;
  value: string;
};

function StringChoiceSetting({
  label,
  setting,
  options,
}: {
  label: string;
  setting: keyof Settings;
  options: ChoiceOption[];
}) {
  const [settings, setSettings] = useAtom(settingsAtom);
  return (
    <label>
      {label}:
      <select
        className="ml-2 text-xs cursor-pointer"
        onChange={(e) =>
          setSettings((prev) => ({
            ...prev,
            [setting]: e.target.value,
          }))
        }
        value={settings[setting] as string}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.text}
          </option>
        ))}
      </select>
    </label>
  );
}
