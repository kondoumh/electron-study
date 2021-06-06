const { ipcRenderer } = require("electron");

const TabGroup = require("electron-tabs");
let tabGroup = new TabGroup({
  newTab: {
    title: 'New Tab'
  }
});

addToTab(tabGroup, 'kondoumh', 'https://kondoumh.com');
addToTab(tabGroup, "Scrapbox", "https://scrapbox.io");

function addToTab(tabGroup, title, url) {
  tabGroup.addTab({
    title: title,
    src: url,
    visible: true,
    active: true,
    ready: tab => {
      tab.on("webview-ready", tab => {
        console.log(tab.title);
      })
    }
  });
}
