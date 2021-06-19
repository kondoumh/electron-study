const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const openAboutWindow = require("about-window").default;

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.loadFile('index.html');
  createMenu();
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
});

function createMenu() {
  const template = [
    {
      label: "View",
      submenu: [
        {
          label: "About",
          click() {
            showAboutWindow();
          }
        },
        { role: "quit" }
      ]
    }
  ];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

function showAboutWindow() {
  openAboutWindow({
    icon_path: path.join(__dirname, "./480px-Electron_Software_Framework_Logo.svg.png"),
    copyright: 'Copyright (c) 2021 kondoumh',
    package_json_dir: __dirname
  });
}
