const { ipcRenderer } = require("electron");

ipcRenderer.on("getTitle", () => {
  ipcRenderer.sendToHost("getTitle", document.location.href);
});
