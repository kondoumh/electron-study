const {app, BrowserView, BrowserWindow, Menu} = require('electron');

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  });

  setupView(mainWindow, 'https://electronjs.org');
  setupView(mainWindow, 'https://www.google.co.jp');
  setupView(mainWindow, 'https://scrapbox.io/kondoumh');

  createMenu();
}

function setupView(win, url) {
  const view = new BrowserView();
  win.addBrowserView(view);
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
            mainWindow.setTopBrowserView(mainWindow.getBrowserViews()[0]);
          }
        },
        {
          label: "site2",
          click() {
            mainWindow.setTopBrowserView(mainWindow.getBrowserViews()[1]);
          }
        },
        {
          label: "site3",
          click() {
            mainWindow.setTopBrowserView(mainWindow.getBrowserViews()[2]);
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
