const { contextBridge } = require('electron') 

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type]);
  }
});

contextBridge.exposeInMainWorld(
  'electronApi', {
    sendToServiceWorker: async (data) => {
      if (navigator.serviceWorker && navigator.serviceWorker.controller) {
        console.log('Sending data to Service Worker:', data);
        navigator.serviceWorker.controller.postMessage(data);
      } else {
        console.error('Service Worker not ready');
      }
    }
  }
);
