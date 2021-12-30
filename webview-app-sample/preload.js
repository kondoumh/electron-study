const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld(
  'api', {
    goBack: (listener) => {
      ipcRenderer.on('goBack', (e, arg) => listener(arg));
    },
    goForward: (listener) => {
      ipcRenderer.on('goForward', (e, arg) => listener(arg));
    },
    openDevTools: (listener) => {
      ipcRenderer.on('openDevTools', (e, arg) => listener(arg));
    },
    notifyReady: (url) => ipcRenderer.send('webview-ready', url)
  }
);

ipcRenderer.on('getTitle', () => {
  ipcRenderer.sendToHost('getTitle', document.location.href);
});

ipcRenderer.on('check', (sender, arg) => {
  console.log(arg);
});
