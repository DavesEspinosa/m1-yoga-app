"use strict";

//Sería mejor traerse los datos del servidor, y luego iterar.
async function getYogaApi() {
  const section = document.querySelector(".advice-one");

  for (let i = 0; i < 5; i++) {
    try {
      const response = await fetch(
        `https://yoga-app-m1.herokuapp.com/yoga/${i + 1}`
      );
      const data = await response.json();

      const article = document.createElement("article");
      article.innerHTML = `
          <img src="${data.img_url}" alt="Keep trying little padawan"/>
          <h5>${data.english_name}</h5>
          <h6>${data.sanskrit_name}</h6>
        `;

      section.appendChild(article);
    } catch (err) {}
  }
}

getYogaApi();


