

//Sería mejor traerse los datos del servidor, y luego iterar.
/* async function getYogaApi() {
  const section = document.querySelector(".advice");

  for (let i = 0; i < 6; i++) {
    try {
      const response = await fetch(
        `https://yoga-app-m1.herokuapp.com/yoga/${i + 1}`
      );
      const data = await response.json();
    } catch (err) {}
  }
}
 
getYogaApi();  */

/* const section = document.querySelector(".advice");

async function getYogaApi() {
  try {
    const response = await fetch(`https://yoga-app-m1.herokuapp.com/yoga`);
    const promise = await response.json();
    const postures = promise.data;

    for (let i = 0; i < 6; i++) {
      randomId = Math.floor(Math.random() * postures.length);
      let posture = postures[randomId];
      newRandomPose(article, data);
      postures.splice()
     
    }
    console.log(postures);
    return postures;
  } catch (err) {}
}
console.log(getYogaApi()); */

/* let createPosture = (yoga) => {
  let article = document.createElement("article");
  article.innerHTML = `
  <img src="${yoga.img_url}" alt="Keep trying little padawan"/>
  <h5>${yoga.english_name}</h5>
  <h6>${yoga.sanskrit_name}</h6>
`;

  section.appendChild(article);
};

let randomYogaApi = async () => {
  const response = await fetch(`https://yoga-app-m1.herokuapp.com/yoga`);
  let jason = await response.json();
  let yogaArr = jason.data;

  for (let i = 0; i < 6; i++) {
    randomNumber = Math.floor(Math.random() * yogaArr.length);
    let yoga = yogaArr[randomNumber];
    createPosture(yoga);
    yogaArr.splice(randomNumber, 1);
  }
}; */

//let i = Math.floor(Math.random()*45)

//randomYogaApi();

//To select a beer as a favorite:

//el problema es que las estrellas de favorito nacen de una función asincrona.
/* 
let update = () => {
  let starArray = [...document.querySelectorAll(".fa-star")];

  for (i = 0; i < starArray.length; i++) {
    starArray[i].addEventListener("click", toggle2);
  }
};

function toggle2(event) {
  event.currentTarget.classList.toggle("favorite");
}
 */
