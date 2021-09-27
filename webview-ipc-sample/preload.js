const { ipcRenderer } = require("electron");

ipcRenderer.on("getTitle", () => {
  ipcRenderer.sendToHost("getTitle", document.location.href);
  const event = new CustomEvent("preload", { detail: "ping" });
  window.dispatchEvent(event);
});

window.addEventListener("callback", e => {
  ipcRenderer.sendToHost("callback", e.detail);
});
