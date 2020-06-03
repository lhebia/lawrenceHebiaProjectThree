// Namespace
const noahsApp = {};

// noahsApp.animalDeck = ['🦕', '🦕', '🦖', '🦖', '🦓', '🦓', '🦒', '🦒', '🦛', '🦛', '🦧', '🦧', '🐎', '🐎', '🐃', '🐃'];
noahsApp.animalDeck = ['🦕', '🦕', '🦖', '🦖', '🦓', '🦓', '🦒', '🦒', '🦛', '🦛', '🦧', '🦧', '🐎', '🐎', '🐃', '🐃', '🐊', '🐊', '🐖', '🐖', '🐅', '🐅', '🐄','🐄'];
noahsApp.shuffledDeck = [];
noahsApp.clickedCard = null;
noahsApp.matchCounter = 0;
noahsApp.winCounter = 0;

noahsApp.init = function() {
    noahsApp.addStartButtonListener();
    noahsApp.shuffledDeck = noahsApp.shuffleDeck(noahsApp.animalDeck)
    noahsApp.createBoard();
    noahsApp.addCardListeners();
    noahsApp.winCounter = noahsApp.setWinCounter();
    noahsApp.restart();
}

noahsApp.addStartButtonListener = function(){
    $('.startButton').on('click', function() {
        $('.heroModal').addClass('negativeZIndex');
    })
}

noahsApp.shuffleDeck = function (arr) {
    const deck = arr;
    for (let i = deck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]]
    }
    return deck;
}

noahsApp.createBoard = function () {
    for (let animal of noahsApp.shuffledDeck) {
        const animalToInsert = animal;
        const animalCard = `<button class="card"><span class="hide">${animalToInsert}</span></button>`;
        $('.gameBoard').append(animalCard);
    }
}

noahsApp.addCardListeners = function() {
    $('.card').on('click', function() {
        $(this).find('span').toggleClass('hide');
        $(this).toggleClass('open');
        noahsApp.checkForMatch($(this));
        setTimeout(function () {
            noahsApp.checkForWinner();
        }, 500)
        console.log(noahsApp.matchCounter);
    })
}

noahsApp.setWinCounter = function() {
    const winCounter = noahsApp.shuffledDeck.length / 2;
    return winCounter;
}

noahsApp.checkForMatch = function(clickedButton) {
    const clickedButtonInner = clickedButton[0].innerHTML;
    if (noahsApp.clickedCard) {
        if (clickedButtonInner === noahsApp.clickedCard[0].innerHTML) {
            setTimeout(function () {
                $('.open').addClass('hidden');
                // $('.open').off();  << -- experimenting
                noahsApp.matchCounter++;
                // TROUBLESHOOTING SOMETHING THAT IS INCREASING THIS
                console.log(noahsApp.matchCounter);
            }, 500)
            noahsApp.clickedCard = null;
        } else {
            setTimeout(function () {
                $('button').removeClass('open');
                $('button').find('span').addClass('hide');
                noahsApp.clickedCard = null;
            }, 500)
        }
    } else {
        noahsApp.clickedCard = clickedButton;
    }
}

noahsApp.checkForWinner = function() {
    if (noahsApp.winCounter === noahsApp.matchCounter) {
        $('h2').html('<span>All animals are off the boat! 🎉🎉🎉</span>');
    }
}

noahsApp.restart = function () {
    $('.resetButton').on('click', function() {
        location.reload();
    })
}

$(function() {
    noahsApp.init();
})