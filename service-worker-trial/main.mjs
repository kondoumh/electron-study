import { app, BrowserWindow, Notification, shell} from 'electron';
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

  mainWindow.on('resized', () => {
    const { width, height } = mainWindow.getBounds();
    new Notification({ title: 'Notification', body: `Window resized to ${width} x ${height}` }).on('click', () => {
      shell.openExternal('https://www.electronjs.org');
    }).show();
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  })
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
