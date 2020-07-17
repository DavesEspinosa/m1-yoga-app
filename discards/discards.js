

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


 "use strict";

const listContainer = document.querySelector("#list-container");
const searchInput = document.querySelector("#searcher");
let data = [];
let input = "";

async function getData() {
  try {
    const response = await fetch(`https://yoga-app-m1.herokuapp.com/yoga`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("ERROR DOWNLOADING YOGA DATA", err);
    return [];
  }
}

function insertListRows(rows) {
  rows.forEach((row) => {
    const rowDOM = document.createElement("div");
    rowDOM.innerHTML = row.english_name;
    listContainer.appendChild(rowDOM);
  });
}

function onSearch(ev) {
  input = ev.target.value;
  listContainer.innerHTML = "";

  if (!input) {
    return insertListRows([]);
  }

  const filteredData = data.filter(function (el) {
    return el.english_name.toLowerCase().includes(input.toLowerCase());
  });

  insertListRows(filteredData);
}

function onEnterPress(ev) {
  if (ev.code !== "Enter") return;

  event.preventDefault();

  const searchModal = document.createElement("div");
	searchModal.classList = "modal-body";
  const searchedElement = JSON.stringify(
    data.find((el) =>
      el.english_name.toLowerCase().includes(input.toLowerCase())
    )
  );
  console.log(searchedElement);
	searchModal.innerHTML = searchedElement;
	document.body.appendChild(searchModal);
}

window.onload = async () => {
  searchInput.addEventListener("keydown", onSearch);
  document.addEventListener("keydown", onEnterPress);
  data = await getData();
};
