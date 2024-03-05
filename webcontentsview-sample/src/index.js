const { app, BaseWindow, WebContentsView } = require('electron');

app.whenReady().then(() => {
  const win = new BaseWindow({ width: 800, height: 600 });

  const leftView = new WebContentsView();
  leftView.webContents.loadURL('https://electronjs.org');
  win.contentView.addChildView(leftView)

  const rightView = new WebContentsView();
  rightView.webContents.loadURL('https://github.com/electron/electron');
  win.contentView.addChildView(rightView)

  leftView.setBounds({ x: 0, y: 0, width: 400, height: 600 });
  rightView.setBounds({ x: 400, y: 0, width: 400, height: 600 });

  // win.webContents.openDevTools();
});
