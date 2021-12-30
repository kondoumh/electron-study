const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld(
  'api', {
    fetchPage: (blogName, apiKey) => {
      const url = `https://api.tumblr.com/v2/blog/${blogName}/info?api_key=${apiKey}`;
      fetch(url).then(res => {
        if (res.status === 200) {
          res.json().then(data => {
            console.log(data);
            document.querySelector('#text').innerHTML += `${data.response.blog.description}`
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