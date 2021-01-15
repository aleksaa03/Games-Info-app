var gameData = document.getElementById("game-data");
var search = sessionStorage.getItem("search");

fetch(`https://api.rawg.io/api/games?search=${search}`, {
  method: "GET",
})
  .then((response) => response.json())
  .then((data) => game(data));

function game(data) {
  var results = data.results;
  var id = sessionStorage.getItem("id");
  for (var i = 0; i < results.length; i++) {
    if (results[i].id == id) {
      document.title = results[i].name;
      gameData.innerHTML += `<img src="${results[i].background_image}" alt="" />
      <h1>${results[i].name}</h1>
      <h4>${results[i].released}</h4>
      <h2>Platforms</h2>
      <h4 id="platform"></h4>
      <h2>Stores</h2>
      <div class="stores" id="stores"></div>`;
      var platformData = document.getElementById("platform");
      var stores = document.getElementById("stores");
      for (var j = 0; j < results[i].platforms.length; j++) {
        platformData.innerHTML += results[i].platforms[j].platform.name + " | ";
      }
      results[i].stores.forEach((store) => {
        var link = document.createElement("a");
        link.className = "link";
        switch (store.store.slug) {
          case "steam":
            link.href = "https://store.steampowered.com";
            break;
          case "origin":
            link.href = "https://www.origin.com";
            break;
          case "epic-games":
            link.href = "https://www.epicgames.com";
            break;
          case "playstation-store":
            link.href = "https://store.playstation.com";
            break;
          case "xbox-store":
            link.href = "https://www.xbox.com";
            break;
          case "gog":
            link.href = "https://www.gog.com";
            break;
          default:
            console.log("error");
            break;
        }
        link.innerHTML += store.store.name;
        stores.appendChild(link);
      });
    }
  }
}

function dark() {
  var root = document.documentElement;
  var theme = localStorage.getItem("theme");
  if (theme == null || theme == "light") {
    document.body.classList.remove("dark");
    root.style.setProperty("--a", "#000000");
  } else {
    document.body.classList.add("dark");
    root.style.setProperty("--a", "#ffffff");
  }
}

dark();
