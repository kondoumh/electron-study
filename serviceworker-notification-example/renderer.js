onload = () => {
  navigator.serviceWorker.register('service-worker.js')
  .then(() => console.log('Service Worker registered'))
  .catch((err) => console.error('Service Worker registration failed:', err));
}

document.querySelector("#service-worker").addEventListener("click", () => {
  navigator.serviceWorker.getRegistration().then((registration) => {
    if (registration) {
      registration.active.postMessage("Hello from the renderer process!");
    } else {
      console.error("No active service worker found.");
    }
  });
});
