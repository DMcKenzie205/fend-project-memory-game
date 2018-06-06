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

/* Create cards within .deck HTML element */
function createDeck(){
for (let i = 0; i < cardDeck.length; i++) {
    const cards = document.createElement('li');
          cards.className = 'card hidden';
          cards.innerHTML += `<i class="fab fa-${cardDeck[i]}"></i>`;

          cards.addEventListener('click', displayCard);

    deck.appendChild(cards);
    }
}

/* Create array for matching cards */
let openCards = [];

/* Toggle classes when card is turned over */
let displayCard = function() {
    this.classList.toggle('open');
    this.classList.toggle('hidden');
    // Push innerHTML to array for matchCard check
    openCards.push(this.innerHTML);
    matchCard();
}

function matchCard() {
    /*let check = openCards;*/
    
    if (openCards.length === 2) {
        cardMatch();
    } else {
        cardNoMatch();
    }
}

function cardMatch() {
    if (openCards[0] === openCards[1]) {

    }
}

function cardNoMatch() {
    const flipped = document.getElementsByClassName('open');

    if (openCards[0] !== openCards[1]) {
        flipped.forEach(function(reset) {
            this.classList.toggle('open');
            this.classList.toggle('hidden');
            openCards = [];
            }); 
        } else {}
}


/*const cardsFlip = deck.getElementsByClassName('open');
let cardCheck = openCards.prototype.filter.call(cardsFlip, cardNoMatch());
*/


function startGame() {
    // Shuffle the card deck
    shuffle(cardDeck);
    // Create randomised deck of cards
    createDeck();
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


/*


 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
