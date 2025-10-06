const connections = new Map();

chrome.runtime.onConnect.addListener((port) => {
  if (port.name !== "devtools" && port.name !== "page") {
    return;
  }

  const extensionListener = (message) => {
    const portTabId = port.sender?.tab?.id ?? -1;
    const tabId =
      portTabId >= 0
        ? portTabId
        : message.action === "init"
          ? message.tabId
          : -1;

    if (tabId < 0) {
      console.warn("Tab ID not found");
      return;
    }

    if (message.action === "init") {
      if (!connections.get(tabId)) {
        connections.set(tabId, new Map());
      }
      connections.get(tabId)?.set(port.name, port);
      return;
    }

    // Other messages are relayed to specified target if any
    // and if the connection exists.
    if (message.target) {
      const tab = connections.get(tabId);
      const port = tab?.get(message.target);
      port?.postMessage(message);
    }
  };

  // Listen to messages sent from the panel script.
  port.onMessage.addListener(extensionListener);

  function sendPing() {
    port.postMessage({ status: "ping" });
  }
  const pingInterval = setInterval(sendPing, 10000);

  // Remove panel connection on disconnect.
  port.onDisconnect.addListener(function (port) {
    port.onMessage.removeListener(extensionListener);
    clearInterval(pingInterval);

    for (const tabId of connections.keys()) {
      const ports = connections.get(tabId);
      if (!ports) {
        continue;
      }
      ports.delete(port.name);
      if (ports.size === 0) {
        connections.delete(tabId);
      }
    }
  });
});
