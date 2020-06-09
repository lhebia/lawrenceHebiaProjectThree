const noahsApp = {};

// Object of all the animal emojis and aria labels
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

// Variables for cards once they are shuffled
noahsApp.shuffledDeck = [];
// Empty storage for first clicked card
noahsApp.clickedCard = null;
// Amount of matches user needs to "win"
noahsApp.matchCounter = 0;

// Add listener to start buttons (the users first action), & reset button
noahsApp.init = function() {
    noahsApp.addStartButtonListener();
    noahsApp.restart();
}

// Timer function with interval
noahsApp.timerUp = function() {
    let min = 0;
    let second = 00;
    let zeroPlaceholder = 0;
    noahsApp.counterId = setInterval(function () {
        noahsApp.incrementTimer();
    }, 1000);

    noahsApp.incrementTimer = function() {
        second++;
        if (second === 59) {
            second = 00;
            min = min + 1;
        }
        if (second === 10) {
            zeroPlaceholder = '';
        } else
            if (second === 00) {
                zeroPlaceholder = 0;
            }
        $('.countUp').text(min + ':' + zeroPlaceholder + second);
    }
}

// Listener to start main app functions when user presses easy or hard
noahsApp.addStartButtonListener = function() {
    $('.startButton').on('click', function() {
        // If easy was selected, slice the deck and shuffle
        if ($(this).hasClass('easy')) {
            noahsApp.smallDeck = noahsApp.animalDeck.slice(0, -6);
            noahsApp.shuffledDeck = noahsApp.shuffleDeck(noahsApp.smallDeck)
        } else {
            // Use full deck & shuffle
            noahsApp.shuffledDeck = noahsApp.shuffleDeck(noahsApp.animalDeck)
        }
        noahsApp.createBoard();
        noahsApp.addCardListeners();
        noahsApp.winCounter = noahsApp.setWinCounter();
        $('.heroModal').addClass('negativeZIndex');
        $('body').toggleClass('hideVerticalOverflow');
        // Start the timer
        noahsApp.timerUp();
    })
}

// Shuffle the deck of animals
noahsApp.shuffleDeck = function (arr) {
    const deck = arr;
    for (let i = deck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]]
    }
    return deck;
}

// Create board pieces and append to board
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

// Add listener for when user clicks each card
noahsApp.addCardListeners = function() {
    $('.card').on('click', function() {
        // If two cards are open, return nothing, get out of function
        if ($('.open').length >= 2) {
            return;
        }
        noahsApp.flipCards($(this));
        noahsApp.checkForMatch($(this));
        // Delay to compensate for card animations and delay
        setTimeout(function () {
            noahsApp.checkForWinner();
        }, 500)
    })
}

// Specific card flip open function
noahsApp.flipCards = function(cardToFlip) {
    $(cardToFlip).find('span').toggleClass('hide');
    $(cardToFlip).toggleClass('open');
}

// Dependant on how many cards are used, set a counter to determine matches needed for win
noahsApp.setWinCounter = function() {
    const winCounter = noahsApp.shuffledDeck.length / 2;
    return winCounter;
}

// Function to check for a match, each time a card is drawn
noahsApp.checkForMatch = function(clickedButton) {
    // If there is already a clicked card
    if (noahsApp.clickedCard) {
        // If clicked cards match
        if (clickedButton.text() === noahsApp.clickedCard.text()) {
            // Delay to allow user to see
            setTimeout(function () {
                // Visually hide cards
                clickedButton.addClass('hidden');
                noahsApp.clickedCard.addClass('hidden');
                $('.hidden').removeClass('open');
                noahsApp.matchCounter++;
            }, 500)
            // Compensate for delay, reset variables
            setTimeout(function () {
                noahsApp.clickedCard = null;
            }, 500)
        } else {
            // Compensate for delays, reset cards
            setTimeout(function () {
                $('button').removeClass('open');
                $('button').find('span').addClass('hide');
                noahsApp.clickedCard = null;
            }, 500)
        }
    } else {
        // This clicked card is added to empty variable
        noahsApp.clickedCard = clickedButton;
    }
}

// If match counter is === win counter, mark as win
noahsApp.checkForWinner = function() {
    if (noahsApp.winCounter === noahsApp.matchCounter) {
        $('h2').html('<span>You got all the animals back in:</span>');
        $('.gameBoard')
            .addClass(`winBackground`)
            .append(`<p class="visuallyHidden">You Win!🦒🦒</p>`);
        clearInterval(noahsApp.counterId);
    }
}

// Page reload to reset all cards
noahsApp.restart = function () {
    $('.resetButton').on('click', function() {
        location.reload();
    })
}

$(function() {
    noahsApp.init();
})