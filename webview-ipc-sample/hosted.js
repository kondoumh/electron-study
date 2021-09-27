window.addEventListener("preload", e => {
  console.log(e.detail);
  const event = new CustomEvent("callback", { detail: "pong" });
  window.dispatchEvent(event);
});
