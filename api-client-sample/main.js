const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const fetch  = require('electron-fetch').default;

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.loadFile('index.html')

  mainWindow.on('closed', function () {
    mainWindow = null
  });
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
});

ipcMain.handle('fetch-pagee', async (e, projectName, pageName) => {
  const data = await fetchPage(projectName, pageName);
  return data;
});

async function fetchPage(projectName, pageName) {
  const url = `https://scrapbox.io/api/pages/${projectName}/${pageName}`;
  let data
  const res = await fetch(url).catch(error => {
    console.error(error);
    return data;
  });
  if (res.status === 200) {
    data = await res.json();
  }
  return data;
}
