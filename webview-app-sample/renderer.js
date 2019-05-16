// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const { ipcRenderer } = require("electron");
const {app} = require("electron").remote;
const webview = document.querySelector("#webview");

webview.addEventListener("dom-ready", () => {
    if (!app.isPackaged) {
        webview.openDevTools();
    }
})

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

