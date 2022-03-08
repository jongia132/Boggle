/// Variables
const letters = [
    ['A','A','E','E','G','N'],
    ['A','B','B','J','O','O'],
    ['A','C','H','O','P','S'],
    ['A','F','F','K','P','S'],
    ['A','O','O','T','T','W'],
    ['C','I','M','O','T','U'],
    ['D','E','I','L','R','X'],
    ['D','E','L','R','V','Y'],
    ['D','I','S','T','T','Y'],
    ['E','E','G','H','N','W'],
    ['E','E','I','N','S','U'],
    ['E','H','R','T','V','W'],
    ['E','I','O','S','S','T'],
    ['E','L','R','T','T','Y'],
    ['H','I','M','N','U','Q'],
    ['H','L','N','N','R','Z']
]
var random = []
var currentSelection = []
const letterbox = document.getElementById("letterbox")

/// Randomise Letters, inject into squares
function randomise() {
    random = []
    for (let n = 0; n < 16; n++) {
        random.push(letters[n][Math.floor(Math.random() * 5 + 1)])
    }
    //Shuffle the shuffled array lmaoo
    shuffle()
    function shuffle() {
        let currentIndex = random.length, randomIndex
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [random[currentIndex], random[randomIndex]] = [random[randomIndex], random[currentIndex]];
        }
        console.table(random)
    }
    // Inject into squares
    var randomIndex = 0
    for (let c = 1; c < 5; c++ ) {
        for (let d = 0; d < 4; d++ ) {
            document.getElementById("tr"+c).getElementsByClassName("box")[d].innerHTML = random[randomIndex]
            randomIndex = randomIndex+1
        }
    }
}
/// Timer

//  Word Queue and Query
$("#submit").click(function(){
    //Check for valid length
    var WordCount = letterbox.value.length
    if (WordCount < 16, WordCount > 2) {
        console.log("Requirements met!")
        // Add word to queue
        askAPI(letterbox.value)
        clearBox()
    }
    else {
        alert("Word must be higher than 3 characters!")
    }
})

/// Point Counter System

/// During Game

//Letter Hold
$(".box").click(function(){
    console.log($(this).text())
    var current = document.getElementById("letterbox").value
    document.getElementById("letterbox").value = current + $(this).text()
    $(this).off('click')
    //currentSelection.push(getWord)
    for (let i = $(this).closest("tr").index(); i < 3;) {
        for (let n = $(this).index(); n<4, n, n-1; n+2) {
            console.log(n)
        }
    }

})

//Clear Box
function clearBox() {
    letterbox.value = ""
}

//Backspace Remove Last Letter
$("html").keydown(function(key){
    if (key.which == 8) {
        event.preventDefault()
        current = letterbox.value
        letterbox.value = current.slice(0, -1);
    }
})

function resetGame() {
    randomise()
    clearBox()
}

/// Startup
randomise()
checkInternet()