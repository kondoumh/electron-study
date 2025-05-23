const { contextBridge, ipcRenderer } = require('electron') 

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type]);
  }
});

contextBridge.exposeInMainWorld(
  'electronApi', {
    downloadFile: async (url) => {
      await ipcRenderer.invoke('download-file', url);
    }
  }
);
