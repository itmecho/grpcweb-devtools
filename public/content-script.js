let port;

function sendGrpcWebData(data) {
  if (!port) {
    return;
  }
  port.postMessage({
    action: "gRPCWebData",
    target: "devtools",
    data,
  });
}

function handleMessageEvent(event) {
  if (event.source !== window || event.data?.type !== "__GRPCWEB_DEVTOOLS__") {
    return;
  }
  sendGrpcWebData(event.data);
}

function setupPort() {
  if (port || !chrome?.runtime) {
    return;
  }
  port = chrome.runtime.connect(undefined, { name: "page" });
  port.postMessage({ action: "init" });
  window.addEventListener("message", handleMessageEvent, false);
  port.onDisconnect.addListener(() => {
    port = undefined;
    window.removeEventListener("message", handleMessageEvent, false);
  });
}

setupPort();
window.addEventListener("focus", setupPort, false);
