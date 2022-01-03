onload = () => {
  document.querySelector('#button1').addEventListener('click', e => {
    console.log("hoge");
    console.log(window.api.hoge());
  });
}
