import { app, BrowserWindow, session, ipcMain, Notification } from 'electron';
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
  mainWindow.webContents.openDevTools();
}

app.whenReady().then( async () => {
  console.log('Registering Service Worker preload script');
  session.defaultSession.registerPreloadScript({
    type: 'service-worker',
    id: 'worker-preload',
    filePath: path.join(__dirname, 'preload-sw.js'),
  });

  session.defaultSession.serviceWorkers.on(
    "registration-completed",
    (event, { scope }) => {
      // Listen for extension service worker registration
      console.log('Service Worker registered:', scope);

      // const running = session.defaultSession.serviceWorkers.getAllRunning();
      // console.log('Running Service Workers:', running);

      // Get ServiceWorkerMain instance from proposed API
      // const sw = session.defaultSession.serviceWorkers.getWorkerFromVersionID(
      //   scope
      // );
      // console.log('Service Worker instance:', sw);
      // if (!sw) return;
  
      // Handle the IPC sent from the service worker preload realm.
      // sw.ipc.handle("NOTIFY_TEXT", (event, text) => {
      //   console.log('Received IPC from Service Worker:', text);
      // });
    }
  );

  session.defaultSession.serviceWorkers.on(
    "console-message",
    (event, messageDetails) => {
      // Listen for console messages from the service worker
      console.log('Service Worker: %d console message: %s', messageDetails.versionId, messageDetails.message);
    }
  )

  session.defaultSession.serviceWorkers.on(
    "running-status-changed",
    (details) => {
      // Listen for running status changes
      console.log('Service Worker running status changed:', details.versionId, details.runningStatus);
      if (details.runningStatus === "running") {
        console.log('Service Worker is running');
        const sw = session.defaultSession.serviceWorkers.getWorkerFromVersionID(
          details.versionId
        );
        if (!sw) return;
        sw.ipc.handle("NOTIFY_TEXT", (event, text) => {
          console.log('Received IPC from Service Worker:', text);
          // Show a notification
          const notification = {
            title: 'Service Worker Notification',
            body: text,
          };
          new Notification(notification).show();
        });
      }
    }
  );
  
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
