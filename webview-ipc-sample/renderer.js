const { ipcRenderer } = require("electron");
const webview = document.querySelector("#webview");

webview.addEventListener("did-finish-load", () => {
  webview.openDevTools();
  webview.send("getTitle");
});

webview.addEventListener("ipc-message", e => {
  switch(e.channel) {
    case "getTitle":
      console.log(e.args[0]);
      break;
    case "callback":
      console.log(e.args[0]);
      break;
  }
});
