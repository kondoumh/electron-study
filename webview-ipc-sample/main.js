const { app, BrowserWindow, Menu, ipcMain, webContents, webviewTag } = require('electron');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
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
  });
  mainWindow.openDevTools();
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
      label: "main",
      submenu: [
        { role: "forceReload" },
        { role: "quit" }
      ]
    }
  ];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}
