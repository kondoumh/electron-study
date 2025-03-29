function checkStatus() {
  //console.log('Checking status...');
  fetch('https://jsonplaceholder.typicode.com/todos/1') // ← 仮のAPI
    .then(res => res.json())
    .then(data => {
      //if (data && data.title !== lastStatus) {
        lastStatus = data.title;

        console.log('title:', data.title);
        myElectronApi.ai.notify(data.title);
      //}
    })
    .catch(err => console.error('[Service Worker] API error:', err));
}

// 起動時 + 以後10秒ごとにチェック
checkStatus();
setInterval(checkStatus, 10000);
