const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld(
  'api', {
    view1: () => ipcRenderer.send('view1'),
    view2: () => ipcRenderer.send('view2'),
    view3: () => ipcRenderer.send('view3'),
    hoge: () => {
      ipcRenderer.send('hoge');
      return 'fuga';
    }
  }
);
