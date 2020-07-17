"use strict";

const listContainer = document.querySelector("#list-container");
const searchInput = document.querySelector("#searcher");
/* const modalArticle = document.querySelector(".advice") */
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

  ev.preventDefault();

  const searchModal = document.createElement("div");
  searchModal.classList = "chosen-pose";
  const searchedElement = data.find((el) =>
    el.english_name.toLowerCase().includes(input.toLowerCase())
  );
	
	
  searchModal.innerHTML = `

 <img src="${searchedElement.img_url}" alt="Keep trying little padawan"/>
      <p>${searchedElement.english_name}</p>
      <p>${searchedElement.sanskrit_name}<p>
    `;
  document.appendChild(searchedElement);
}
/* 
function onEnterPress(ev) {
  if (ev.code !== "Enter") return;

  ev.preventDefault();

  const searchModal = document.createElement("article");

  const searchedElement = data.find((el) =>
    el.english_name.toLowerCase().includes(input.toLowerCase())
  );

  searchModal.innerHTML = `

	<img src="${searchedElement.img_url}" alt="Keep trying little padawan"/>
			 <p>${searchedElement.english_name}</p>
			 <p>${searchedElement.sanskrit_name}<p>
		 `;

  
 
  document.appendChild(searchModal);
}
 */
window.onload = async () => {
  searchInput.addEventListener("keydown", onSearch);
  document.addEventListener("keydown", onEnterPress);

  data = await getData();
};

//Esta borrando el desplegable solo cuando doy un ultimo borrar
