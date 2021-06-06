const { ipcRenderer } = require("electron");

const TabGroup = require("electron-tabs");
let tabGroup = new TabGroup({
  newTab: {
    title: 'New Tab'
  }
});

tabGroup.addTab({
  title: 'kondoumh',
  src: 'https://kondoumh.com',
});

tabGroup.addTab({
  title: "Scrapbox",
  src: "https://scrapbox.io",
  visible: true,
  active: true
});
