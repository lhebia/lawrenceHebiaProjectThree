const noahsApp = {};

noahsApp.animalDeck = [
    {
        animal: '\u{1f995}',
        label: 'A sauropod'
    },
    {
        animal: '\u{1f995}',
        label: 'A sauropod'
    },
    {
        animal: '\u{1f996}',
        label: 'A T-rex'
    },
    {
        animal: '\u{1f996}',
        label: 'A T-rex'
    },
    {
        animal: '\u{1f993}',
        label: 'A Zebra'
    },
    {
        animal: '\u{1f993}',
        label: 'A Zebra'
    },
    {
        animal: '\u{1f992}',
        label: 'A Giraffe'
    },
    {
        animal: '\u{1f992}',
        label: 'A Giraffe'
    },
    {
        animal: '\u{1f99B}',
        label: 'A Hippopotamus'
    },
    {
        animal: '\u{1f99B}',
        label: 'A Hippopotamus'
    },
    {
        animal: '\u{1F418}',
        label: 'An Elephant'
    },
    {
        animal: '\u{1F418}',
        label: 'An Elephant'
    },
    {
        animal: '\u{1F40E}',
        label: 'A horse'
    },
    {
        animal: '\u{1F40E}',
        label: 'A horse'
    },
    {
        animal: '\u{1F403}',
        label: 'A Water Buffalo'
    },
    {
        animal: '\u{1F403}',
        label: 'A Water Buffalo'
    },
    {
        animal: '\u{1F40A}',
        label: 'A Crocodile'
    },
    {
        animal: '\u{1F40A}',
        label: 'A Crocodile'
    },
    {
        animal: '\u{1F42A}',
        label: 'A Camel'
    },
    {
        animal: '\u{1F42A}',
        label: 'A Camel'
    },
    {
        animal: '\u{1F405}',
        label: 'A Tiger'
    },
    {
        animal: '\u{1F405}',
        label: 'A Tiger'
     },
     {
        animal: '\u{1F404}',
        label: 'A Cow'
     },
     {
        animal: '\u{1F404}',
        label: 'A Cow'
     }];

noahsApp.shuffledDeck = [];
noahsApp.clickedCard = null;
noahsApp.matchCounter = 0;

noahsApp.init = function() {
    noahsApp.addStartButtonListener();
    noahsApp.restart();
}

noahsApp.addStartButtonListener = function() {
    $('.startButton').on('click', function() {
        if ($(this).hasClass('easy')) {
            noahsApp.smallDeck = noahsApp.animalDeck.slice(0, -6);
            noahsApp.shuffledDeck = noahsApp.shuffleDeck(noahsApp.smallDeck)
        } else {
            noahsApp.shuffledDeck = noahsApp.shuffleDeck(noahsApp.animalDeck)
        }
        noahsApp.createBoard();
        noahsApp.addCardListeners();
        noahsApp.winCounter = noahsApp.setWinCounter();
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
            .attr('aria-role', 'img')
            .attr('aria-label', animalObject.label)
            .html(animalObject.animal);
        animalCard.append(animalSpan);
        $('.gameBoard').append(animalCard);
    }) 
}

noahsApp.addCardListeners = function() {
    $('.card').on('click', function() {
        if ($('.open').length >= 2) {
            return false;
        }
        noahsApp.flipCards($(this));
        noahsApp.checkForMatch($(this));
        setTimeout(function () {
            noahsApp.checkForWinner();
        }, 500)
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
    if (noahsApp.clickedCard) {
        if (clickedButton.text() === noahsApp.clickedCard.text()) {
            setTimeout(function () {
                clickedButton.addClass('hidden');
                noahsApp.clickedCard.addClass('hidden');
                $('.hidden').removeClass('open');
                noahsApp.matchCounter++;
            }, 500)
            setTimeout(function () {
                noahsApp.clickedCard = null;
            }, 500)
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