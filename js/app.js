/*******************************************************************************
 * Set References
 
https://scotch.io/tutorials/how-to-build-a-memory-matching-game-in-javascript

https://davidwalsh.name/function-debounce


/*******************************************************************************
 * Set Global Values
 */

/* Card Deck images for matching from Font Awesome */
const cardDeck = ['d-and-d', 'd-and-d', 'drupal', 'drupal', 
                  'fort-awesome', 'fort-awesome', 'cloudversify', 'cloudversify', 
                  'grunt', 'grunt', 'ethereum', 'ethereum', 
                  'angellist', 'angellist', '500px', '500px'];

/* Global Variables */
const chosen = [];
console.log(chosen);
const restart = document.querySelector('.restart');
const progress = document.getElementsByClassName('stars');
const matched = [];

const deck = document.querySelector('.deck');
const modal = document.querySelector('.modal');

let moveCounter = document.querySelector('.moves');
let moves = 0;

const totalLevels = 3;
let currentLevel = 3;

/* Create cards within .deck HTML element */
function createDeck(){

    for (let i = 0; i < cardDeck.length; i++) {
        const card = document.createElement('li');

        card.className = 'card hidden';
        card.innerHTML += `<i class="fab fa-${cardDeck[i]}"></i>`;
        card.setAttribute('data-icon', `${cardDeck[i]}`);
        card.addEventListener('click', debounce(handleCardClick, 100));

        deck.appendChild(card);
    }
}

function generateLevelDisplay() {
    const starsPanel = document.querySelector('.stars');
    starsPanel.innerHTML = "";

    for (i = 0; i < currentLevel; i++) {
        const level = document.createElement('li');
        level.innerHTML += '<i class="fas fa-star"></i>';
    
    starsPanel.appendChild(level);
    }

    for (i = 0; i < (totalLevels - currentLevel); i++) {
        const level = document.createElement('li');
        level.innerHTML += '<i class="far fa-star"></i>';
    
    starsPanel.appendChild(level);
    }   
}

/* Handle card events for game functions */
function handleCardClick(event) {
    
    event.preventDefault();
    chosen.push(this);
    //Check if card has been matched previously
    if (this.classList.contains('.matched')) {
        return
    }

    //Collect open card elements
    
    if (chosen.length > 2) {
        chosen.length = 0;
        return;
    }
    //Flip the Card
    this.classList.replace('hidden', 'open');

    console.log(chosen);
    /* Check if 2 cards are flipped */
    if (chosen.length === 2) {
        //Record the move
        movesCount();

        if (chosen[0].dataset.icon === chosen[1].dataset.icon) {
            chosen[0].classList.add('matched');
            chosen[1].classList.add('matched');

            matched.push(this);
        } else {
        // return cards to normal state after a short delay
        setTimeout(function () {
            chosen[0].classList.replace('open', 'hidden');
            chosen[1].classList.replace('open', 'hidden');
            }, 1000);

        }
    }

    levelCounter();
    generateLevelDisplay();
}

/* Set functions for game start on window.load or start game action */
function startGame() {
    // Shuffle the card deck
    shuffle(cardDeck);
    // Create randomised deck of cards
    createDeck();

    generateLevelDisplay();

    currentLevel = 3;
    moves = 0;
}

function movesCount() {
    moves++;
    moveCounter.innerHTML = moves;
}

function levelCounter() {
    if (moves < 10) {
        currentLevel = 3;
    } else if (moves > 10 && moves < 18) {
        currentLevel = 2;
    } else if (moves > 18 && moves < 25) {
        currentLevel = 1;
    } else if (moves > 25) {
        currentLevel = 0;
    }
}

window.onload = startGame();

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function debounce(fn, delay) {
  var timer = null;
  return function () {
    var context = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}
/* insert this as a callback on HandleCardClick */
function winGame() {
    if (matched.length === 8) {
        alert("Congratulations!!!");
    }
    toggleModal();
}

/* Restart Game */

restart.addEventListener('click', startGame);


function toggleModal() {
    modal.classList.toggle('show-modal');
}

/*
 *  + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */