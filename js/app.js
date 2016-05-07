/* Step 1
Declare the global variables
*/

var secretNumber = generateRandomNumber(1, 100);
//console.log("Secret Number: " + secretNumber);

//color changes from neutral grey to hot red
document.body.style.backgroundColor = "#333";

//set the max number of guesses
var oldGuess = 0

//set the maximum number of guesses
var counter = 30;
$("#count").text(counter);


/*Step 2
Functions defined
*/

function newGame() {
    document.location.reload(true);
}

function generateRandomNumber(min, max) {
    var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
}

function showGuessCounter(counter) {
    $("#count").text(counter);
}

function guessHistory(guessedNumber) {
    $("#guessList").append('<li>' + guessedNumber + "</li>");
}

//function to implement a simple validation of the insert input
function validate(guessedNumber) {

    //check the guessed number in the console
    //console.log("Guessed Number: " + guessedNumber);

    /*apply validation*/

    if (isNaN(guessedNumber)) {
        alert("Please enter a number!");
        //reset the guess value to nothing
        $("#userGuess").val("");
        return false; //meaning stop the loop and don't do anything else
    } else if (guessedNumber % 1 !== 0) {
        alert("Please enter an integer value!");
        //reset the guess value to nothing
        $("#userGuess").val("");
        return false; //meaning stop the loop and don't do anything else
    } else if ((guessedNumber < 1) || (guessedNumber > 100)) {
        alert("Please enter a number between 1 and 100!");
        //reset the guess value to nothing
        $("#userGuess").val("");
        return false; //meaning stop the loop and don't do anything else
    } else {
        guessFeedback(secretNumber, guessedNumber);

        if (oldGuess !== 0) {
            relativeFeedback(secretNumber, oldGuess, newGuess);
        }

        oldGuess = newGuess;

        counter--;

        guessHistory(guessedNumber);

        showGuessCounter(counter);

        $("#userGuess").val("");

        if (counter <= 0) {
            $("#feedback").text("Game Over!");
            document.getElementById("userGuess").disabled = true;
            document.getElementById("guessButton").disabled = true;
            alert("The Secret number was " + secretNumber + " Better luck next time!");
        }

    }

}

//function to provide feedback to the user
function guessFeedback(secretNumber, guessedNumber) {

    var difference = Math.abs(secretNumber - guessedNumber);
    if (difference >= 50) {
        $("#feedback").text("Ice Cold!");
        document.body.style.backgroundColor = "#002cb3";
    } else if (difference >= 30 && difference <= 49) {
        $("#feedback").text("Cold!");
        document.body.style.backgroundColor = "#3333cc";
    } else if (difference >= 20 && difference <= 29) {
        $("#feedback").text("Warm!");
        document.body.style.backgroundColor = "#8533ff";
    } else if (difference >= 10 && difference <= 19) {
        $("#feedback").text("Hot!");
        document.body.style.backgroundColor = "#b84dff"
    } else if (difference >= 1 && difference <= 9) {
        $("#feedback").text("Very Hot!");
        document.body.style.backgroundColor = "#fc0446"
    } else {
        $("#feedback").text("YOu got it. Well done!");
        //the closer you are the, the color changes from neutral grey to hot red
        document.body.style.backgroundColor = "#ff0404";
        document.getElementById("userGuess").disabled = true;
        document.getElementById("guessButton").disabled = true;
    }
}

//Function to provided relative feedback to the user/player
function relativeFeedback(secretNumber, oldGuess, newGuess) {
    var oldDiff = Math.abs(parseInt(secretNumber) - parseInt(oldGuess));
    var newDiff = Math.abs(parseInt(secretNumber) - parseInt(newGuess));
    if (newDiff > oldDiff) {
        $("#relative-feedback").text("You are colder than your last guess!");
    } else if (newDiff === oldDiff) {
        $("#relative-feedback").text("You are as far as your last guess!");
    } else {
        $("#relative-feedback").text("You are hotter than your last guess!");
    }
}


/*Step 3
Using our Functions
*/

$(document).ready(function () {
    $(".new").on("click", newGame);

    $("#guessButton").on("click", function () {

        var guessedNumber = $("#userGuess").val();

        var newGuess = guessedNumber;

        validate(guessedNumber);


    });

    $(document).on("keypress", function (event) {
        //on enter
        if (event.which === 13) {

            event.preventDefault();

            var guessedNumber = $("#userGuess").val();

            var newGuess = guessedNumber;

            validate(guessedNumber);

        }

    });

    /*--- Display information modal box ---*/
    $(".what").click(function () {
        $(".overlay").fadeIn(1000);

    });

    /*--- Hide information modal box ---*/
    $("a.close").click(function () {
        $(".overlay").fadeOut(1000);
    });
});
