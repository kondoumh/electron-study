const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld(
  'api', {
    tab1: async () => await ipcRenderer.invoke('tab1'),
    tab2: async () => await ipcRenderer.invoke('tab2'),
    switchPage: async () => {
      await ipcRenderer.invoke('switch-to-electronjs');
      return 'fuga';
    }
  }
);
