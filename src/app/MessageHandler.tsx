import { useSetAtom } from "jotai";
import { useEffect, useRef } from "react";
import { entriesAtom } from "../state/entries";
import { ulid } from "ulid";

function handler(update: any, data: any) {
  if (data.action !== 'gRPCWebData') {
    return;
  }
  update((prev: any) => [
    ...prev,
    {
      id: ulid(),
      method: data.data.method,
      request: data.data.request,
      response: data.data.response,
    },
  ]);
}

export function MessageHandler() {
  const setEntries = useSetAtom(entriesAtom);

  const port = useRef<chrome.runtime.Port>(null);
  const tabId = useRef<number>(null);

  useEffect(()=> {
    const handle = (data: any) => {
      handler(setEntries, data);
    };
    if (chrome && !port.current) {
      try {
        tabId.current = chrome.devtools.inspectedWindow.tabId;
        port.current = chrome.runtime.connect(undefined, { name: "devtools" });
        port.current.postMessage({ tabId: tabId.current, action: "init" });
        port.current.onMessage.addListener(handle);
        // chrome.tabs.onUpdated.addListener(_onTabUpdated);
      } catch (error) {
        console.warn("not running app in chrome extension panel", error);
      }
      
    }
    return () => {
      if (port.current) {
        port.current.onMessage.removeListener(handle);
      }
    };
  }, [setEntries]);
  return null;
}
