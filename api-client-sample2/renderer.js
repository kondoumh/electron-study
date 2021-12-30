onload = () => {
  document.querySelector('#fetch').addEventListener('click', e => {
    const blogName = document.querySelector('#blog_name').value;
    const apiKey = document.querySelector('#api_key').value;
    window.api.fetchPage(blogName, apiKey);
  });
}
