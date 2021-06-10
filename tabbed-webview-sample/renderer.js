const { ipcRenderer } = require("electron");

const TabGroup = require("electron-tabs");
let tabGroup = new TabGroup({
  newTab: {
    title: 'New Tab'
  }
});

addToTab(tabGroup, 'kondoumh', 'https://kondoumh.com');
addToTab(tabGroup, "Scrapbox", "https://scrapbox.io");
addToTab(tabGroup, "Scrapbox/kondoumh", "https://scrapbox.io/kondoumh/");


function addToTab(tabGroup, title, url) {
  tabGroup.addTab({
    title: title,
    src: url,
    visible: true,
    active: true,
    ready: tab => {
      tab.on("webview-ready", tab => {
        console.log(tab.title);
        ipcRenderer.send("tab-ready", tab.webview.getURL());
      })
    }
  });
}
