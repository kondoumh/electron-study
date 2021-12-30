const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld(
  'api', {
    fetchPage: (projectName, pageName) => {
      const url = `https://scrapbox.io/api/pages/${projectName}/${pageName}`;
      fetch(url).then(res => {
        if (res.status === 200) {
          res.json().then(data => {
            data.lines.forEach(element => {
              document.querySelector('#text').innerHTML += `${element.text}<br>`;
            });
            document.querySelector('#image').src = data.image;
          })
        } else {
          console.log(res.status);
        }
      }).catch(err => {
        console.log(err);
      });
    }
  }
);
