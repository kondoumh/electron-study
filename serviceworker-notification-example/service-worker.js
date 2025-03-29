function checkStatus() {
  //console.log('Checking status...');
  fetch('https://jsonplaceholder.typicode.com/todos/1') // Fake API for testing
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

checkStatus();
setInterval(checkStatus, 10000); // Check every 10 seconds

globalThis.addEventListener('message', (event) => {
  console.log('Received message from renderer:', event.data);
  myElectronApi.ai.notify(event.data);
});
