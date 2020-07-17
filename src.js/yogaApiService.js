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
//No está bien, faltaría darle una vuelta, no puede ser que tenga que seleccionar la clase, o si.
function onEnterPress(ev) {
  if (ev.code !== "Enter") return;

  event.preventDefault();
  document.querySelector(".chosen-pose ").innerHTML='';
  const searchModal = document.createElement("article");
	searchModal.classList = "chose";
  const searchedElement = 
    data.find((el) =>
      el.english_name.toLowerCase().includes(input.toLowerCase())
  );
  searchModal.innerHTML = `

  <img src="${searchedElement.img_url}" alt="Keep trying little padawan"/>
       <h3>${searchedElement.english_name}</h3>
     `;
	document.querySelector(".chosen-pose ").appendChild(searchModal);
}

/* function onEnterPress(ev) {
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
	document.querySelector(".text-search ").appendChild(searchModal);
}
 */

window.onload = async () => {
  searchInput.addEventListener("keydown", onSearch);
  document.addEventListener("keydown", onEnterPress);
  data = await getData();
};
