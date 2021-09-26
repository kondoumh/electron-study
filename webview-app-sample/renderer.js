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

webview.addEventListener("ipc-message", (e, arg) => {
  if (e.channel === "getTitle") {
     console.log(e.args[0]);
  }
});

webview.addEventListener("did-finish-load", () => {
  webview.send("getTitle");
});
