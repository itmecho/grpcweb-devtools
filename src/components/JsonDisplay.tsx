import ReactJson from "@microlink/react-json-view";
import { useAtomValue } from "jotai";
import { settingsAtom } from "../state/settings";

export function JsonDisplay({ src }: { src: object }) {
  const { theme } = useAtomValue(settingsAtom);
  const settings = useAtomValue(settingsAtom);
  return (
    <div className="text-xs">
      <ReactJson
        name={false}
        src={src}
        theme={theme === "dark" ? "ocean" : "rjv-default"}
        indentWidth={settings.jsonIndent}
        collapsed={settings.jsonCollapsed}
        displayArrayKey={settings.jsonShowArrayKeys}
        displayDataTypes={settings.jsonShowDataTypes}
        displayObjectSize={settings.jsonShowObjectSize}
        style={{
          backgroundColor: "transparent",
          padding: "calc(var(--spacing) * 4)",
        }}
      />
    </div>
  );
}
