import { EntryDisplay } from "./app/entry-display/EntryDisplay";
import { EntryList } from "./app/EntryList";
import { MessageHandler } from "./app/MessageHandler";
import { Toolbar } from "./app/Toolbar";

function App() {
  return (
    <div className="dark:bg-gray-900 dark:text-gray-200 h-full max-h-screen overflow-hidden flex flex-col">
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
