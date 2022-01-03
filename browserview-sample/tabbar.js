onload = () => {
  document.querySelector('#view1').addEventListener('click', e => {
    window.api.view1();
  });
  document.querySelector('#view2').addEventListener('click', e => {
    window.api.view2();
  });
  document.querySelector('#view3').addEventListener('click', e => {
    window.api.view3();
  });
}
