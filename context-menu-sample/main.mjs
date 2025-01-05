import { app, BrowserWindow, Menu } from 'electron';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

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

  mainWindow.webContents.on('context-menu', (e, params) => {
    const contextMenu = Menu.buildFromTemplate(buildMenuTemplate(params));
    contextMenu.popup({ window: mainWindow.webContents });
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

function buildMenuTemplate(params) {
  const menuTemplete = [
    {
      label: 'menu1',
      click: () => {
        const { linkURL, linkText, selectionText } = params;
        console.log('menu1 clicked');
        console.table({ linkURL, linkText, selectionText });
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
  ];
  return menuTemplete;
}
