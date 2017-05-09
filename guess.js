$(document).ready(function () {
    var lowMin = 1;
    var highMax = 1000;
    var low;//highest guess where the target number was HIGHER
    var high;//lowest guess where the target number was LOWER
    var lastGuess;//last guess made
    var startButton = $("#startButton");
    var guessButtons = $(".guessButtons");
    var thatsItButton = $("#thatsItButton");
    var displayMessage = $("#displayMessage");
    var lowerButton = $("#lowerButton");
    var higherButton = $("#higherButton");
    var smartGuessButton = $("#smartGuess");
    var aiButtons = $(".aiButton");
    var higherWasClicked = false;
    var smartGuess = false;
    var guesses = [];
    var newGameMessage = " Play Again? Think of a number between " + lowMin + " and " + highMax + ".";

    startButton.click(function () {
        low = lowMin;
        high = highMax;
        lastGuess;
        higherWasClicked = false;
        smartGuess = false;
        guesses = [];
        aiButtons.show();
        startButton.hide();
        displayMessage.empty().text("Which level of computer intelligence would you like to challenge?");
    });

    aiButtons.click(function () {
        guessButtons.show();
        thatsItButton.show();
        aiButtons.hide();
        lastGuess = getNumber(high, low);
        displayMessage.empty().text("I guess " + lastGuess);
        guesses.push(lastGuess);
    });

    smartGuessButton.click(function () {
        smartGuess = true;
    });

    thatsItButton.click(function () {
        playAgain();
        if (guesses.length === 1) {
            displayMessage.empty().text("It took me " + guesses.length + " guess!" + newGameMessage);
        }
        displayMessage.empty().text("It took me " + guesses.length + " guesses!" + newGameMessage);
    });

    lowerButton.click(function () {
        higherWasClicked = false;
        high = lastGuess - 1;
        nextGuess();
    });

    higherButton.click(function () {
        higherWasClicked = true;
        low = lastGuess + 1;
        nextGuess();
    });

    function nextGuess() {
        if (high === low) {
            playAgain();
            displayMessage.empty().text("The number must be " + high + "!" + newGameMessage);
        } else {
            lastGuess = getNumber(high, low);
            displayMessage.empty().text("I guess " + lastGuess);
            guesses.push(lastGuess);
        }
    };

    function getNumber(high, low) {
        if (smartGuess && higherWasClicked) {
            return Math.round((low + high) / 2);
        } else if (smartGuess) {
            return Math.floor((low + high) / 2);
        } else if (higherWasClicked) {
            return Math.round(Math.random() * (high - low) + low);
        }
        return Math.floor(Math.random() * (high - low) + low);
    };

    function playAgain() {
        guessButtons.hide();
        thatsItButton.hide();
        startButton.text("Play Again!");
        startButton.show();
    }
});