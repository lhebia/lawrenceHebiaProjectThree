// Namespace
const noahsApp = {};

noahsApp.animalDeck = [
    {
        animal: '🦕',
        matchId: '001'
    },
    {
        animal: '🦕',
        matchId: '001'
    },
    {
        animal: '🦖',
        matchId: '002'
    },
    {
        animal: '🦖',
        matchId: '002'
    },
    {
        animal: '🦓',
        matchId: '003'
    },
    {
        animal: '🦓',
        matchId: '003'
    },
    {
        animal: '🦒',
        matchId: '004'
    },
    {
        animal: '🦒',
        matchId: '004'
    },
    {
        animal: '🦛',
        matchId: '005'
    },
    {
        animal: '🦛',
        matchId: '005'
    },
    {
        animal: '🦧',
        matchId: '006'
    },
    {
        animal: '🦧',
        matchId: '006'
    },
    {
        animal: '🐎',
        matchId: '007'
    },
    {
        animal: '🐎',
        matchId: '007'
    },
    {
        animal: '🐃',
        matchId: '008'
    },
    {
        animal: '🐃',
        matchId: '008'
    },
    {
        animal: '🐊',
        matchId: '009'
    },
    {
        animal: '🐊',
        matchId: '009'
    },
    {
        animal: '🐖',
        matchId: '010'
    },
    {
        animal: '🐖',
        matchId: '010'
    },
    {
        animal: '🐅',
        matchId: '011'
    },
    {
        animal: '🐅',
        matchId: '011'
     },
     {
        animal: '🐄',
        matchId: '012'
     },
     {
        animal: '🐄',
        matchId: '012'
     }];

noahsApp.shuffledDeck = [];
noahsApp.clickedCard = null;
noahsApp.matchCounter = 0;
noahsApp.lockBoard = false;

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
        $('body').toggleClass('hideVerticalOverflow');
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
    noahsApp.shuffledDeck.forEach( function(animalObject) {
        const animalCard = $('<button>').addClass('card');
        const animalSpan = $('<span>')
            .addClass('hide')
            .text(`${animalObject.animal}`);
        animalCard.append(animalSpan);
        $('.gameBoard').append(animalCard);
    }) 
}

noahsApp.addCardListeners = function() {
    $('.card').on('click', function() {
        noahsApp.flipCards($(this));
        noahsApp.checkForMatch($(this));
        setTimeout(function () {
            noahsApp.checkForWinner();
        }, 450)
    })
}

noahsApp.flipCards = function(cardToFlip) {
    $(cardToFlip).find('span').toggleClass('hide');
    $(cardToFlip).toggleClass('open');
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
                noahsApp.matchCounter++;
            }, 450)
            noahsApp.clickedCard = null;
        } else {
            noahsApp.lockBoard = true;
            setTimeout(function () {
                $('button').removeClass('open');
                $('button').find('span').addClass('hide');
                noahsApp.clickedCard = null;
            }, 450)
        }
    } else {
        noahsApp.clickedCard = clickedButton;
    }
}

noahsApp.checkForWinner = function() {
    if (noahsApp.winCounter === noahsApp.matchCounter) {
        $('h2').html('<span>All the animals are back on land!</span>');
        $('.gameBoard')
            .addClass(`winBackground`)
            .append(`<p class="visuallyHidden">You Win!🦒🦒</p>`);
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