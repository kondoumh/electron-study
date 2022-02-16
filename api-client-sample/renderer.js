onload = () => {
  document.querySelector("#fetch").addEventListener("click", async e => {
    const projectName = document.querySelector("#project_name").value;
    const pageName = document.querySelector("#page_name").value;
    const data = await window.api.fetchPage(projectName, pageName);
    if (data) {
      data.lines.forEach(element => {
        document.querySelector('#text').innerHTML += `${element.text}<br>`;
      });
      document.querySelector('#image').src = data.image;
    }
  });
}
