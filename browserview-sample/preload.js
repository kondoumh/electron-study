const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld(
  'api', {
    tab1: () => ipcRenderer.invoke('tab1'),
    tab2: () => ipcRenderer.invoke('tab2'),
    switchPage: () => {
      ipcRenderer.invoke('switch-to-electronjs');
      return 'fuga';
    }
  }
);
