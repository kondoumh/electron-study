const {app, BrowserView, BrowserWindow, Menu} = require('electron');

let mainWindow;
let view1;
let view2;
let view3;

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  });

  view1 = new BrowserView();
  mainWindow.addBrowserView(view1);
  setupView(view1, 'https://electronjs.org');

  view2 = new BrowserView();
  mainWindow.addBrowserView(view2);
  setupView(view2, 'https://www.google.co.jp');

  view3 = new BrowserView();
  mainWindow.addBrowserView(view3);
  setupView(view3, 'https://scrapbox.io/kondoumh');

  createMenu();
}

function setupView(view, url) {
  view.setBounds({ x: 0, y: 0, width: 800, height: 600 });
  view.setAutoResize({width: true, height: true});
  view.webContents.loadURL(url);
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

function createMenu() {
  const template = [
    {
      label: "View",
      submenu: [
        {
          label: "site1",
          click() {
            mainWindow.setTopBrowserView(view1);
          }
        },
        {
          label: "site2",
          click() {
            mainWindow.setTopBrowserView(view2);
          }
        },
        {
          label: "site3",
          click() {
            mainWindow.setTopBrowserView(view3);
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
