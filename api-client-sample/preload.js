const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld(
  'api', {
    fetchPage: async (projectName, pageName) => {
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
  }
);
