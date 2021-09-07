const pictureArray = [
  "./assets/001-orange.svg",
  "./assets/001-orange.svg",
  "./assets/002-pear.svg",
  "./assets/002-pear.svg",
  "./assets/003-melon.svg",
  "./assets/003-melon.svg",
  "./assets/004-peanut.svg",
  "./assets/004-peanut.svg",
  "./assets/005-banana.svg",
  "./assets/005-banana.svg",
  "./assets/013-berry.svg",
  "./assets/013-berry.svg",
  "./assets/007-kiwi.svg",
  "./assets/007-kiwi.svg",
  "./assets/008-pineapple.svg",
  "./assets/008-pineapple.svg",
];

//target all elements with the class "cards"
let cards = document.querySelectorAll(".card");

//target the replay button
let playAgain = document.querySelector("button");

//target the modal dialog box
let modal = document.querySelector("#modal");

let clickedCards = [];
let winArray = [];

playAgain.addEventListener("click", hideModal);
startGame(pictureArray);

function startGame(pictures) {
  // start the game
  // shuffle the cards
  let shuffled = shuffleArray(pictures);
  // setup click event listener
  cards.forEach((card) => {
    card.addEventListener("click", selectCard);
    card.src = shuffled.shift();
  });
}

function shuffleArray(oldCards) {
  // accept a deck of cards
  // copy the deck of cards
  // shuffle the new deck
  // return the shuffled cards
  let newCards = Array.from(oldCards);
  for (let i = newCards.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = newCards[i];
    newCards[i] = newCards[j];
    newCards[j] = temp;
  }
  return newCards;
}

function selectCard(event) {
  // accept a click event
  // append the 'clicked' class to the target
  event.target.classList += " clicked";
  // push the target to the 'clickedCards' winArray
  clickedCards.push(event.target);
  // when the 'clickedCards' length is 2, compare the cards
  // if the cards are same
  //   append the 'success' class to the cards
  //   otherwise apply the 'failure' class to the cards
  if (
    clickedCards.length === 2 &&
    clickedCards[0].src === clickedCards[1].src
  ) {
    clickedCards.forEach((card) => {
      card.removeEventListener("click", selectCard);
      card.parentNode.classList += " success";
    });
    setTimeout(checkWin, 200);
  } else if (clickedCards.length === 2) {
    clickedCards.forEach((card) => {
      card.parentNode.classList += " failure";
    });
    // hide the cards after 1.5 seconds by calling 'hideCards'
    setTimeout(hideCards, 1500);
  }
}

function hideCards() {
  // for all the clicked cards
  // make their classes be 'card' and 'card-hidden'
  // make their parent node class be 'container'
  // set the clickedCards array to empty
  clickedCards.forEach((card) => {
    card.classList = "card card-hidden";
    card.parentNode.classList = " container";
    clickedCards = [];
  });
}

function checkWin() {
  // add 'match' to the winArray
  // check if the length of the winArray is 8
  // if the length is 8 then call showModal
  // set the clickedCards array to be empty
  winArray.push("match");
  if (winArray.length === 8) {
    showModal();
  }

  clickedCards = [];
}

function clearBoard() {
  // set the clickedCards array to be empty
  // set the winArray to be empty
  // for every card
  //   make the cards class list be 'card' and 'card-hidden'
  //   make the card parent node class list be 'container
  // set the clickedCards array to be emtpy
  // call the startGame function with the array of pictures
  clickedCards = [];
  winArray = [];
  cards.forEach((card) => {
    card.classList = "card card-hidden";
    card.parentNode.classList = " container";
    clickedCards = [];
  });

  startGame(pictureArray);
}

function hideModal(event) {
  // set the modal visibility to 'hidden'
  // call the clearBoard function
  modal.style.visibility = "hidden";
  clearBoard();
}

function showModal(event) {
  // set the modal visibility to 'visible'
  modal.style.visibility = "visible";
}
