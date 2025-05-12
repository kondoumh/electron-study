import { app, BrowserWindow, Menu, clipboard } from 'electron';
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
    const focusedFrame = mainWindow.webContents.focusedFrame;
    console.log('focusedFrame', focusedFrame);
    const menuTemplate = buildMenuTemplate(params);
    const visibleItems = menuTemplate.filter(item => item.visible);
    const contextMenu = Menu.buildFromTemplate(visibleItems);
    contextMenu.popup({
      window: mainWindow.webContents,
      frame: focusedFrame,
    });
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

function buildMenuTemplate(params) {
  const menuTemplete = [
    {
      label: 'Open link',
      click: () => {
        const { linkURL, linkText, selectionText } = params;
        console.log('menu1 clicked');
        console.table({ linkURL, linkText, selectionText });
      },
      visible: params.linkURL
    },
    {
      label: `Search Google for '${params.selectionText}'`,
      click: () => {
        console.log('menu2 clicked');
      },
      visible: params.selectionText.trim().length > 0
    },
    { type: 'separator' },
    {
      label: 'Copy image',
      click: () => { content.copyImageAt(params.x, params.y); },
      visible: params.mediaType === 'image'
    },
    {
      label: 'Copy image URL',
      click: () => { clipboard.writeText(params.srcURL); },
      visible: params.mediaType === 'image'
    },
  ];
  return menuTemplete;
}
