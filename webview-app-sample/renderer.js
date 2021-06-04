const { ipcRenderer } = require("electron");

ipcRenderer.on("check", (sender, arg) => {
  console.log(arg);
});
