import { useAtomValue } from "jotai";
import { entriesAtom, selectedEntryAtom } from "../../state/entries";
import { JsonEntryDisplay } from "./JsonEntryDisplay";
import { settingsAtom } from "../../state/settings";
import { EntryDisplayMessage } from "../../components/EntryDisplayMessage";
import { TabbedEntryDisplay } from "./TabbedEntryDisplay";

export function EntryDisplay() {
  const settings = useAtomValue(settingsAtom);
  const entries = useAtomValue(entriesAtom);
  const selectedEntry = useAtomValue(selectedEntryAtom);
  if (entries.length === 0) {
    return (
      <EntryDisplayMessage>No grpc-web requests captured.</EntryDisplayMessage>
    );
  }
  if (!selectedEntry) {
    return (
      <EntryDisplayMessage>Select a request from the list.</EntryDisplayMessage>
    );
  }

  return settings.outputView === "json" ? (
    <JsonEntryDisplay entry={selectedEntry} />
  ) : (
    <TabbedEntryDisplay entry={selectedEntry} />
  );
}
