// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const { ipcRenderer } = require("electron");
const webview = document.querySelector("#webview");

ipcRenderer.on("goBack", () => {
  if (webview.canGoBack()) {
      webview.goBack();
  }
});

ipcRenderer.on("goForward", () => {
  if (webview.canGoForward()) {
    webview.goForward();
  }
});

ipcRenderer.on("openDevTools", () => {
  webview.openDevTools();
});

ipcRenderer.on("check", (sender, arg) => {
  console.log(arg);
});