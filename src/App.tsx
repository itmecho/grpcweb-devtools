import { useAtomValue } from "jotai";
import { EntryDisplay } from "./app/entry-display/EntryDisplay";
import { EntryList } from "./app/EntryList";
import { MessageHandler } from "./app/MessageHandler";
import { Toolbar } from "./app/Toolbar";
import { settingsAtom } from "./state/settings";
import { useEffect } from "react";

function App() {
  const { theme } = useAtomValue(settingsAtom);
  useEffect(() => {
    const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    document.body.setAttribute(
      "data-theme",
      theme === "auto" ? preferredTheme : theme,
    );
  }, [theme]);

  return (
    <div
      className="
        bg-slate-200
        text-slate-900
        dark:bg-slate-800
        dark:text-slate-200
        h-full
        max-h-screen
        overflow-hidden
        flex
        flex-col
      "
    >
      <MessageHandler />
      <Toolbar />
      <div className="grow flex max-h-[calc(100vh - var(--toolbar-height))] overflow-y-auto">
        <EntryList />
        <EntryDisplay />
      </div>
    </div>
  );
}

export default App;
