const {app, BrowserView, BrowserWindow, Menu} = require('electron');

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  });
  setupTabBar(mainWindow);
  setupView(mainWindow, 'https://electronjs.org');
  setupView(mainWindow, 'https://www.google.co.jp');
  setupView(mainWindow, 'https://scrapbox.io/kondoumh');

  ['resize'].forEach(e => {
    mainWindow.on(e, () => {
      mainWindow.getBrowserViews().forEach((view, index) => {
        resizeView(view, index);
      })
    });
  });

  createMenu();
}

function setupView(win, url) {
  const view = new BrowserView();
  win.addBrowserView(view);
  resizeView(view, 1);
  view.webContents.loadURL(url);
}

function setupTabBar(win) {
  const view = new BrowserView();
  win.addBrowserView(view);
  const bound = mainWindow.getBounds();
  view.setBounds({ x: 0, y: 0, width: bound.width, height: 30 });
  view.webContents.loadURL(`file://${__dirname}/tabbar.html`);
}

function resizeView(view, index) {
  const bound = mainWindow.getBounds();
  if (index === 0) {
    view.setBounds({ x: 0, y: 0, width: bound.width, height: 30 });
  } else {
    view.setBounds({ x: 0, y: 30, width: bound.width, height: bound.height - 30 });
  }
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
            mainWindow.setTopBrowserView(mainWindow.getBrowserViews()[1]);
          }
        },
        {
          label: "site2",
          click() {
            mainWindow.setTopBrowserView(mainWindow.getBrowserViews()[2]);
          }
        },
        {
          label: "site3",
          click() {
            mainWindow.setTopBrowserView(mainWindow.getBrowserViews()[3]);
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