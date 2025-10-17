import { useSetAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import { entriesAtom, type Entry } from "../state/entries";
import { ulid } from "ulid";
import type { DataMessage } from "../message";

function handler(
  update: (set: (prev: Entry[]) => Entry[]) => void,
  data: DataMessage,
) {
  if (data.action !== "gRPCWebData") {
    return;
  }
  update((prev: Entry[]) => [
    ...prev,
    {
      id: ulid(),
      timestamp: new Date(),
      method: data.data.method,
      request: data.data.request,
      response: data.data.response,
      error: data.data.error,
    },
  ]);
}

export function MessageHandler() {
  const setEntries = useSetAtom(entriesAtom);

  const [port, setPort] = useState<chrome.runtime.Port | null>(null);
  const tabId = useRef<number>(null);

  useEffect(() => {
    const onMessage = (data: DataMessage) => {
      handler(setEntries, data);
    };
    if (window.chrome !== undefined && !port) {
      try {
        tabId.current = chrome.devtools.inspectedWindow.tabId;
        const port = chrome.runtime.connect(undefined, { name: "devtools" });
        port.postMessage({ tabId: tabId.current, action: "init" });
        port.onMessage.addListener(onMessage);
        port.onDisconnect.addListener(() => setPort(null));
        setPort(port);
        // chrome.tabs.onUpdated.addListener(_onTabUpdated);
      } catch (error) {
        console.warn("not running app in chrome extension panel", error);
      }
    }
    return () => {
      if (port) {
        port.onMessage.removeListener(onMessage);
      }
    };
  }, [port, setEntries]);

  return null;
}
