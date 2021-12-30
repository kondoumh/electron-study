onload = () => {
  document.querySelector("#fetch").addEventListener("click", e => {
    const projectName = document.querySelector("#project_name").value;
    const pageName = document.querySelector("#page_name").value;
    window.api.fetchPage(projectName, pageName);
  });
}
