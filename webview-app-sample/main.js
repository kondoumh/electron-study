const { app, BrowserWindow, Menu, ipcMain } = require('electron');
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

  mainWindow.loadURL('https://github.com');

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
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
})

function createMenu() {
  const template = [
    {
      label: "View",
      submenu: [
        {
          label: "go back",
          accelerator: "CmdOrCtrl+[",
          click() {
            if (mainWindow.webContents.canGoBack()) {
              mainWindow.webContents.goBack();
            }
          }
        },
        {
          label: "go forward",
          accelerator: "CmdOrCtrl+]",
          click() {
            if (mainWindow.webContents.canGoForward()) {
              mainWindow.webContents.goForward();
            }
          }
        },
        {
          label: "CheckBox Menu",
          id: "checkboxMenu",
          type: "checkbox",
          click() {
            const checked = Menu.getApplicationMenu().getMenuItemById("checkboxMenu").checked;
            if (checked) {
              mainWindow.webContents.send("check", "enable");
            } else {
              mainWindow.webContents.send("check", "disable");
            }
          }
        },
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

contextMenu({
  prepend: (defaultActions, parameters, mainWindow) => [
    {
      label: 'Rainbow',
      // Only show it when right-clicking images
      visible: parameters.mediaType === 'image'
    },
    {
      label: 'Search Google for “{selection}”',
      // Only show it when right-clicking text
      visible: parameters.selectionText.trim().length > 0,
      click: () => {
        shell.openExternal(`https://google.com/search?q=${encodeURIComponent(parameters.selectionText)}`);
      }
    }
  ]
});
