/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
 */

import GAMES_DATA from "./games.js";

const GAMES_JSON = JSON.parse(GAMES_DATA);

function deleteChildElements(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
 */
const gamesContainer = document.getElementById("games-container");

function addGamesToPage(games) {
  for (let i = 0; i < games.length; i++) {
    const gameDiv = document.createElement("div");
    gameDiv.classList.add("game-card");

    const gameImg = document.createElement("img");
    gameImg.src = games[i].img;
    gameImg.alt = "Image of game #" + i;
    gameImg.classList.add("game-img");

    const gameName = document.createElement("h3");
    gameName.innerText = games[i].name;

    const gameDesc = document.createElement("p");
    gameDesc.innerText = games[i].description;

    const gameBackers = document.createElement("p");
    gameBackers.innerText = "Backers: " + games[i].backers;

    gameDiv.append(gameImg, gameName, gameDesc, gameBackers);
    gamesContainer.append(gameDiv);
  }
}

addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
 */

const contributionsCard = document.getElementById("num-contributions");

const totalContributions = GAMES_JSON.reduce(
  (backers, game) => backers + game.backers,
  0
);

contributionsCard.innerHTML = `${totalContributions.toLocaleString("en-US")}`;

const raisedCard = document.getElementById("total-raised");

const moneyPledged = GAMES_JSON.reduce(
  (money, game) => money + game.pledged,
  0
);

raisedCard.innerHTML = `$${moneyPledged.toLocaleString("en-US")}`;

const gamesCard = document.getElementById("num-games");

gamesCard.innerHTML = `${GAMES_JSON.length}`;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
 */

function filterUnfundedOnly() {
  deleteChildElements(gamesContainer);

  const filterUnfunded = GAMES_JSON.filter((game) => {
    return game.pledged < game.goal;
  });

  addGamesToPage(filterUnfunded);
}

function filterFundedOnly() {
  deleteChildElements(gamesContainer);

  const filterFunded = GAMES_JSON.filter((game) => {
    return game.pledged >= game.goal;
  });

  addGamesToPage(filterFunded);
}

function showAllGames() {
  deleteChildElements(gamesContainer);
  addGamesToPage(GAMES_JSON);
}

const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

unfundedBtn.addEventListener("click", () => {
  filterUnfundedOnly();
});

fundedBtn.addEventListener("click", () => {
  filterFundedOnly();
});

allBtn.addEventListener("click", () => {
  showAllGames();
});

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
 */

const descriptionContainer = document.getElementById("description-container");

const numOfUnfundedGames = GAMES_JSON.filter((game) => {
  return game.pledged < game.goal;
});

const unfundedGamesEle = document.createElement("p");
unfundedGamesEle.innerText = `${
  numOfUnfundedGames.length > 0
    ? `A total of ${raisedCard.innerHTML} has been raised for ${gamesCard.innerHTML} games. Currently, ${numOfUnfundedGames.length} games remain unfunded. We need your help to fund these amazing games!`
    : ""
}`;
unfundedGamesEle.classList.add("section-paragraph");

descriptionContainer.append(unfundedGamesEle);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((item1, item2) => {
  return item2.pledged - item1.pledged;
});

const firstGame = { ...sortedGames[0] };
const secondGame = { ...sortedGames[1] };

const firstGameName = document.createElement("p");
firstGameName.innerHTML = firstGame.name;

const secondGameName = document.createElement("p");
secondGameName.innerHTML = secondGame.name;

firstGameContainer.append(firstGameName);
secondGameContainer.append(secondGameName);
