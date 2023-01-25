const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld(
  'api', {
    fetchPage: async (projectName, pageName) => {
      const data = await ipcRenderer.invoke('fetch-pagee', projectName, pageName);
      return data;
    }
  }
);
