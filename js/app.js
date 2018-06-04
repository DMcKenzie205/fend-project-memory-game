/*******************************************************************************
 * Set References
 
https://scotch.io/tutorials/how-to-build-a-memory-matching-game-in-javascript

  */

/*******************************************************************************
 * Set Global Values
 */

/* Card Deck images for matching from Font Awesome */
const cardDeck = ['d-and-d', 'd-and-d', 'drupal', 'drupal', 
                  'fort-awesome', 'fort-awesome', 'cloudversify', 'cloudversify', 
                  'grunt', 'grunt', 'ethereum', 'ethereum', 
                  'angellist', 'angellist', '500px', '500px'];

/* Global Consts */
const deck = document.querySelector('.deck');
const restart = document.getElementsByClassName('restart');
const progress = document.getElementsByClassName('stars');
const moves = document.getElementsByClassName('moves');
const card = document.getElementsByClassName('card');
const cards = document.getElementsByClassName('...card');

let displayCard = function() {
    this.classList.toggle('open');
    this.classList.toggle('hidden');
}


/* Create cards within .deck HTML element */
function createDeck(){
for (let i = 0; i < cardDeck.length; i++) {
    const cards = document.createElement('li');
          cards.className = 'card hidden';
          cards.innerHTML += `<i class="fab fa-${cardDeck[i]}"></i>`;

          cards.addEventListener('click', displayCard);
          /*cards.addEventListener('click', cardOpen);*/
    deck.appendChild(cards);
    }
}



function startGame() {
    // Shuffle the card deck
    shuffle(cardDeck);
    // Create randomised deck of cards
    createDeck();
}

window.onload = startGame();



/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
