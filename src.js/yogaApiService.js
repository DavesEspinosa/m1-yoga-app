"use strict";

//Variable constante, que no va a cambiar.
const NUMBER_OF_POSES = 1;

//variable sin valor inicial, la cual lleno con los datos de la api, me devuelve una array(objeto)
let allPoses = null;

//Sería mejor traerse los datos del servidor, y luego iterar.
async function getYogaApi() {
  //en el caso de querer un botón, vaciar la section before
  const section = document.querySelector(".advice");

  try {
    const response = await fetch(`https://yoga-app-m1.herokuapp.com/yoga`);
    const data = await response.json();
    
    allPoses = data;
    console.log(allPoses);
    const randomPoses = getRandomPoses(data);
    console.log(randomPoses);
    randomPoses.forEach((element) => {
      bringPose(section, element);
    });
  } catch (err) {}
}

//NUeva función para añadir al buscador.
function searchPoses(event) {
  const serchText=  event.currentTarget.value;
}

function bringPose(section, data) {
  section.innerHTML='';
  const article = document.createElement("article");
  article.innerHTML = `

 <img src="${data.img_url}" alt="Keep trying little padawan"/>
      <p>${data.english_name}</p>
      <p>${data.sanskrit_name}<p>
    `;
  //not sure if is list or section
  section.appendChild(article);
  console.log(data);
}

function getRandomPoses(dataArr) {
  const newArr = [];
  for (let i = 0; i < NUMBER_OF_POSES; i++) {
    let randomId = Math.floor(Math.random() * dataArr.length);
    let pose = dataArr.splice(randomId, 1)[0];

    newArr.push(pose);
  }
  return newArr;
}


