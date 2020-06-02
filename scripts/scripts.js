// Namespace

const noahsApp = {};

noahsApp.animalDeck = ['🦕', '🦕', '🦖', '🦖', '🦓', '🦓', '🦒', '🦒', '🦛', '🦛', '🦧', '🦧', '🐎', '🐎', '🐃', '🐃'];
noahsApp.shuffledDeck = [];
noahsApp.clickedCard1 = null;
noahsApp.matchCounter = 0;

noahsApp.init = function() {
    noahsApp.shuffledDeck = noahsApp.shuffleDeck(noahsApp.animalDeck)
    noahsApp.createBoard();
    // noahsApp.addCardListeners();
}

noahsApp.createBoard = function () {
    for (let animal of noahsApp.shuffledDeck) {
        const animalToInsert = animal;
        const animalCard = `<button class="card"><span class="hide">${animalToInsert}</span></button>`;
        $('.gameBoard').append(animalCard);
    }
}

noahsApp.shuffleDeck = function (arr) {
    const deck = arr;
    for (let i = deck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]]
    }
    return deck;
}


noahsApp.addCardListeners = function() {
    $('button').on('click', function() {
        $(this).find('span').toggleClass('hide');
    })
}


$(function() {
    noahsApp.init();
})

console.log('Yellow!');