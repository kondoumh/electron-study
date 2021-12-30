const webview = document.querySelector('#webview');

window.api.goBack(() => {
  if (webview.canGoBack()) {
    webview.goBack();
  }
});

window.api.goForward(() => {
  if (webview.canGoForward()) {
    webview.goForward();
  }
});

window.api.openDevTools(() => {
  webview.openDevTools();
});

webview.addEventListener('dom-ready', () => {
  api.notifyReady(webview.getURL());
});

webview.addEventListener('ipc-message', e => {
  if (e.channel === 'getTitle') {
     console.log(e.args[0]);
  }
});

webview.addEventListener('did-finish-load', () => {
  webview.send('getTitle');
});
