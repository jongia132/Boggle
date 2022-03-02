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

/// Word Point Processing
function wordScore() {

}

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
//Dictionary API Hooker
async function checkWord(word) {
    const a = await fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + word).then (response => {return response.status})
    return a
}
async function askAPI(word) {
    if (navigator.onLine = true) {
        const status = await checkWord(word)
        console.log("Status Code: "+status)
        if (status == 200){
            alert("That was a valid word!")
            return true
        }
        else if (status == 404) {
            alert("Your word failed to pass the dictionary test!")
            return false
        }
        else if (status == 503) {
            alert("The dictionary API is currently experiencing issues. You will be moved into offline mode temporarily during this session.")
        }
        else {
            alert("An unknown error has occured!")
        }
    }
    else {
        alert("Online Functionality Not Available")
    }
}

/// Point Counter System



/// Check letter count =/> 3

/// Lock surrounding squares

/// Check internet Connection

const checkInternet = () => {
    document.getElementById('onlinestatus').innerText = navigator.onLine ? 'Connected':'Disconnected'
}
window.addEventListener('online', checkInternet)
window.addEventListener('offline', checkInternet)

/// During Game

//Letter Click
$("td").click(function(){
    console.log($(this).text())
    var current = document.getElementById("letterbox").value
    document.getElementById("letterbox").value = current + $(this).text()
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