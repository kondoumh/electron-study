import { app, BrowserWindow, Menu } from 'electron';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let mainWindow;

function ContextParams(linkURL, linkText, selectionText) {
  this.linkURL = linkURL;
  this.linkText = linkText;
  this.selectionText = selectionText;
}

const contextParams = new ContextParams('', '', '');

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

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'menu1',
      click: () => {
        if (contextParams.linkURL) console.log('linkURL:', contextParams.linkURL);
        if (contextParams.linkText) console.log('linkText:', contextParams.linkText);
        if (contextParams.selectionText) console.log('selectionText:', contextParams.selectionText);
        console.log('menu1 clicked');
      }
    },
    {
      label: 'menu2',
      click: () => {
        console.log('menu2 clicked');
      }
    },
    { type: 'separator' },
    {
      label: 'Quit',
      click: () => {
        app.quit();
      }
    }
  ]);

  mainWindow.webContents.on('context-menu', (e, params) => {
    updateContextParams(params);
    contextMenu.popup(mainWindow, params.x, params.y);
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
function updateContextParams(params) {
  contextParams.linkURL = params.linkURL;
  contextParams.linkText = params.linkText;
  contextParams.selectionText = params.selectionText;
}
