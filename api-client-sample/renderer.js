onload = () => {
  document.querySelector("#fetch").addEventListener("click", e => {
    const projectName = document.querySelector("#project_name").value;
    const pageName = document.querySelector("#page_name").value;
    fetchPage(projectName, pageName);
  });
}

function fetchPage(projectName, pageName) {
  const url = `https://scrapbox.io/api/pages/${projectName}/${pageName}`;
  fetch(url).then(res => {
    if (res.status === 200) {
      res.json().then(data => {
        data.lines.forEach(element => {
          document.querySelector("#text").innerHTML += `${element.text}<br>`;
        });
        document.querySelector("#image").src = data.image;
      })
    } else {
      console.log(res.status);
    }
  }).catch(err => {
    console.log(err);
  });
}
