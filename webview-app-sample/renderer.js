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

webview.addEventListener("dom-ready", e => {
  ipcRenderer.send("webview-ready", webview.getURL());
});
