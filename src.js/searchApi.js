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
