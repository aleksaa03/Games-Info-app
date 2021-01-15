var cards = document.getElementById("cards");
var input = document.getElementById("input");

function api(input) {
  var search = input.value;
  sessionStorage.setItem("search", search);
  fetch(`https://api.rawg.io/api/games?search=${search}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => games(data));
}

function games(data) {
  cards.innerHTML = "";
  var result = document.getElementById("result");
  result.innerHTML = "Search results for " + sessionStorage.getItem("search");
  var results = data.results;
  for (var i = 0; i < results.length; i++) {
    cards.innerHTML += `<div class="card" onclick="openGame(${results[i].id})">
      <div class="game-image">
        <img src="${results[i].background_image}" alt="" />
      </div>
      <div class="game-data">
        <h1>${results[i].name}</h1>
        <h4>${results[i].released}</h4>
      </div>
    </div>`;
  }
}

function openGame(id) {
  window.location = "game/game.html";
  sessionStorage.setItem("id", id);
}

function key(e) {
  var key = e.keyCode;
  if (key == 13) {
    api(input);
  }
}

var root = document.documentElement;
function dark() {
  var card = getComputedStyle(root).getPropertyValue("--card");
  var gameData = getComputedStyle(root).getPropertyValue("--game-data");

  if (card == " #f2f2f2" && gameData == " #e0e0e0") {
    root.style.setProperty("--card", "#202020");
    root.style.setProperty("--game-data", "#313131");
    localStorage.setItem("theme", "dark");
  } else {
    root.style.setProperty("--card", " #f2f2f2");
    root.style.setProperty("--game-data", " #e0e0e0");
    localStorage.setItem("theme", "light");
  }

  document.body.classList.toggle("dark");
}

var theme = localStorage.getItem("theme");
if (theme == null || theme == "light") {
  root.style.setProperty("--card", " #f2f2f2");
  root.style.setProperty("--game-data", " #e0e0e0");
  document.body.classList.remove("dark");
} else {
  root.style.setProperty("--card", "#202020");
  root.style.setProperty("--game-data", "#313131");
  document.body.classList.add("dark");
}

input.addEventListener("keyup", key);
