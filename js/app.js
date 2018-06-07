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

/* Global Variables */
const restart = document.getElementsByClassName('restart');
const progress = document.getElementsByClassName('stars');
let moveCounter = document.querySelector('.moves');
let moves = 0;

/* Create cards within .deck HTML element */
function createDeck(){
    for (let i = 0; i < cardDeck.length; i++) {
        const card = document.createElement('li');
        const deck = document.querySelector('.deck');

        card.className = 'card hidden';
        card.innerHTML += `<i class="fab fa-${cardDeck[i]}"></i>`;
        card.setAttribute('data-icon', `${cardDeck[i]}`);
        card.addEventListener('click', handleCardClick);

        deck.appendChild(card);
    }
}

/* Handle card events for game functions */
function handleCardClick(event) {
    event.preventDefault();

    //Check if card has been matched previously
    if (this.classList.contains('.matched')) {
        return
    }
    //Flip the Card
    this.classList.replace('hidden', 'open');
    //Collect open card elements
    const chosen = document.querySelectorAll('.open:not(.matched)');
    /* Check if 2 cards are flipped */
    if (chosen.length === 2) {
        //Record the move
        movesCount();

        if (chosen[0].dataset.icon === chosen[1].dataset.icon) {
            chosen[0].classList.add('matched');
            chosen[1].classList.add('matched');
        } else {
        // return cards to normal state after a short delay
        setTimeout(function () {
            chosen[0].classList.replace('open', 'hidden');
            chosen[1].classList.replace('open', 'hidden');
            }, 1000); 
        }
    }
}

/* Set functions for game start on window.load or start game action */
function startGame() {
    // Shuffle the card deck
    shuffle(cardDeck);
    // Create randomised deck of cards
    createDeck();
}

function movesCount() {
    moves++;
    moveCounter.innerHTML = moves;
    
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


 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */




