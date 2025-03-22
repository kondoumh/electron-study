import { app, BrowserWindow, ipcMain, Notification, dialog } from 'electron';
import fs from 'fs';
import https from 'node:https';
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
  //mainWindow.webContents.openDevTools();
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

ipcMain.handle('download-file', async (event, url) => {
  const defaltFileName = path.basename(url);
  const { canceled, filePath } = await dialog.showSaveDialog({
    title: 'Save File',
    defaultPath: path.join(app.getPath('downloads'), defaltFileName),
    buttonLabel: 'Save',
  });
  if (canceled || !filePath) {
    console.log('File save canceled');
    return;
  }

  const file = fs.createWriteStream(filePath);

  https.get(url, (response) => {
    response.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log('File saved to:', filePath);
    });
  }).on('error', (err) => {
    fs.unlink(filePath);
    console.error(err);
  });
});
