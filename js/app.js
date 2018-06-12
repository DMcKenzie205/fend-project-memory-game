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
const restart = document.querySelector('.restart');
const progress = document.getElementsByClassName('stars');
const matched = [];

const deck = document.querySelector('.deck');
const modal = document.querySelector('.modal');

let moveCounter = document.querySelector('.moves');
let moves = 0;

let chosen = [];

const totalLevels = 3;
let currentLevel = 3;

/*******************************************************************************
 * Core functions for creating the game
 */

/* Create cards within .deck HTML element */
function createDeck(){
    // Iterate for each item in the cardDeck array
    for (let i = 0; i < cardDeck.length; i++) {
        const card = document.createElement('li');
        //Add card object information and innerHTML to complete card structure
        card.className = 'card hidden';
        card.innerHTML += `<i class="fab fa-${cardDeck[i]}"></i>`;
        card.setAttribute('data-icon', `${cardDeck[i]}`);
        //Attach click evt listener to each card which will call function.. 
        // with a debounce function to delay to click slightly
        card.addEventListener('click', debounce(handleCardClick, 100));

        deck.appendChild(card);
    }
}

/* Create the star based accomplishment meter */
function generateLevelDisplay() {
    const starsPanel = document.querySelector('.stars');
    starsPanel.innerHTML = "";
    // Add filled stars based on current level (default is 3)
    for (i = 0; i < currentLevel; i++) {
        const level = document.createElement('li');
        level.innerHTML += '<i class="fas fa-star"></i>';
    
    starsPanel.appendChild(level);
    }
    // Add empty stars after above to a max of 3 total stars
    for (i = 0; i < (totalLevels - currentLevel); i++) {
        const level = document.createElement('li');
        level.innerHTML += '<i class="far fa-star"></i>';
    
    starsPanel.appendChild(level);
    }   
}

/* Handle card events for game functions */
function handleCardClick(event) {
    event.preventDefault();
    // Add the clicked card to the chosen array
    chosen.push(this);
    // Check if card has been matched previously
    if (this.classList.contains('.matched')) {
        return
    }  
    // Flip the Card
    this.classList.replace('hidden', 'open');
    // Check if 2 cards are flipped
    if (chosen.length === 2) {
        // Record the move
        movesCount();
    // Check to see if the 2 flipped cards match
    if (chosen[0].dataset.icon === chosen[1].dataset.icon) {
        // Add matched class to both cards if they do match
        chosen[0].classList.add('matched');
        chosen[1].classList.add('matched');
        // add the card to the matched array
        matched.push(this);
        // Reset the chosen array
        chosen = []
    } else {
    // return cards to normal state after a short delay
    setTimeout(function () {
        chosen[0].classList.replace('open', 'hidden');
        chosen[1].classList.replace('open', 'hidden');
        // Reset the chosen array
        chosen = []
        }, 1000);
    }
    // Call to check if number of moves affect the accomplishment meter
    levelCounter();
    // Regenerate the levelDisplay based on No. of moves
    generateLevelDisplay();
    console.log(chosen);
    }
}

/* Set functions for game start on window.load or start game action */
function startGame() {
    deck.innerHTML = "";
    // Shuffle the card deck
    shuffle(cardDeck);
    // Create randomised deck of cards
    createDeck();
    // Initialise the levelDisplay
    generateLevelDisplay();
    // Set base values for level and No. of moves
    currentLevel = 3;
    moves = 0;
    moveCounter.innerHTML = moves;
}

/* Increase the moves counter by one */
function movesCount() {
    moves++;
    moveCounter.innerHTML = moves;
}

/* Check if the No. of moves will cause the No. of stars to change */
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

/* Initialise the game */
window.onload = startGame();

/* Shuffle function from http://stackoverflow.com/a/2450976 */
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

/* Debounce function to delay clickability and prevent multi-clicks */
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

restart.addEventListener('click', function() {
    startGame();
});


function toggleModal() {
    modal.classList.toggle('show-modal');
}

/*
 *  + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
