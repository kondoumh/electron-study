const { app, BrowserWindow, Menu, ipcMain, webContents } = require('electron');
const contextMenu = require('electron-context-menu');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      webviewTag: true,
      contextIsolation: false
    }
  });

  mainWindow.loadFile('index.html');
  createMenu();

  mainWindow.on('closed', function () {
    mainWindow = null;
  })
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});

function createMenu() {
  const template = [
    {
      label: "View",
      submenu: [
        { role: "quit" }
      ]
    }
  ];
  if (!app.isPackaged) {
    template.unshift({
      label: "Debug",
      submenu: [
        { role: "forceReload" },
        { role: "toggledevtools" },
        {
          label: "open devTools for WebView",
          click() {
            mainWindow.webContents.send("openDevTools");
          }
        }
      ]
    });
  }
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

ipcMain.on("tab-ready", (e, url) => {
  const contents = webContents.getAllWebContents().filter(c => !c.getURL().startsWith('file://'));
  const content = contents.find(c => c.getURL() === url);
  console.log(content.getURL());
  contextMenu({
    window: content,
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
});
