// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const { ipcRenderer } = require("electron");
const webview = document.querySelector("#webview");
const contextMenu = require('electron-context-menu');

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

contextMenu({
  window: webview,
  prepend: (defaultActions, params, browserWindow) => [
    {
      label: 'Rainbow',
      // Only show it when right-clicking images
      visible: params.mediaType === 'image'
    },
    {
      label: 'Search Google for “{selection}”',
      // Only show it when right-clicking text
      visible: params.selectionText.trim().length > 0,
      click: () => {
        shell.openExternal(`https://google.com/search?q=${encodeURIComponent(params.selectionText)}`);
      }
    }
  ]
});
