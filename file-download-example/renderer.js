onload = () => {
  document.querySelector('#download').addEventListener('click', async () => {
    const url = "https://i.gyazo.com/e14604e56118058b4c49a10f9d3f64f0.png";
    await window.electronApi.downloadFile(url);
  });
}
