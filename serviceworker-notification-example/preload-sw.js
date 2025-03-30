const { contextBridge, ipcRenderer } = require('electron');

if (process.type == 'service-worker') {
  exposeApi();
}

function exposeApi() {
  const api = {
    notify: (text) => {
      console.log('Sending IPC to Main:', text);
      ipcRenderer.invoke("NOTIFY_TEXT", text);
    },
  };

  // Expose our API in the main JS context of the worker thread.
  contextBridge.exposeInMainWorld("myElectronApi", api);
}
