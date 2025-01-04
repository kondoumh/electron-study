import { app, BrowserWindow } from 'electron';
import { fileURLToPath } from 'node:url';

import path from 'node:path';
import contextMenu from 'electron-context-menu';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      spellcheck: true
    }
  });

  mainWindow.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

contextMenu({
  prepend: (defaultActions, parameters, mainWindow) => [
    {
      label: 'Rainbow',
      visible: parameters.mediaType === 'image'
    },
    {
      label: 'Search Google for “{selection}”',
      visible: parameters.selectionText.trim().length > 0,
      click: () => {
        shell.openExternal(`https://google.com/search?q=${encodeURIComponent(parameters.selectionText)}`);
      }
    }
  ]
});
