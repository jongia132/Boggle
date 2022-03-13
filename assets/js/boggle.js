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
var mouseDown = false
var orderCount = 0

//Sounds
function click_sound() {
    const sound = new Audio("./assets/sounds/mixkit-plastic-bubble-click-1124.wav")
    const newsound = sound.cloneNode()
    newsound.play()
}
const success_sound = new Audio("./assets/sounds/mixkit-select-click-1109.wav")
function error_sound() {
    const audio = new Audio("./assets/sounds/mixkit-negative-tone-interface-tap-2569.wav")
    const newaudio = audio.cloneNode()
    newaudio.play()
}

class index {
    constructor (x,y) {
        this.x = x
        this.y = y
    }
    static lockBox() {
        console.log(document.getElementById("tr"+this.y).getElementsByClassName("box")[this.x].textContent())
    }

    static clear() {
        return random = []
    }
}

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
    for (let c = 0; c < 4; c++ ) {
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
        currentSelection = []
    }
    else {
        Swal.fire({
            text: "Stop being a dumbass!",
            icon: 'error'
        })
        error_sound()
    }
})

/// Point Counter System

/// During Game

///Letter Hold
    // boxLocker Function
    //function lockBox(x, y){
    //    var selected = document.getElementById("tr"+ (column+1)).getElementsByClassName("box")[row + 1]
    //    console.log(selected)
    //}

// On hold enable hover tracker
$("td").mousedown(function(e) {
    event.preventDefault()
    $("tr>td.selected").removeClass("selected")
    $("tr>td.start").removeClass("start")
    $(this).addClass("start")
    currentSelection = []
    if (e.which == 1) {
        mouseDown = true
        console.log("Mousedown")
        currentSelection.push($(this).text())
        letterbox.value = $(this).text()
        $(this).addClass("selected")
        click_sound()
    }
})

$("html").mouseup(function(e) {
    if (e.which == 1) {
        mouseDown = false
        console.log("Mouseup")
        orderCount = 0
        $("td").removeAttr("data-order");
        if (currentSelection.length < 3) {
            letterbox.value = null
            $(this).removeClass("selected")
            currentSelection = []
        }
        else {
            //new index.lockBox(2,3)
        }
    }
})

$(".box").hover (function() {
    if (mouseDown == true) {
        if ($(this).hasClass("selected") == false) {
            currentSelection.push($(this).text())
            console.log($(this).text())
            $(this).addClass("selected")
            $(this).attr("data-order", orderCount+1)
            orderCount++
            //var row = $(this).closest("tr").index()
            //var column = $(this).index()
            //console.log(row, column)
            document.getElementById("letterbox").value = letterbox.value + $(this).text()
            console.log(currentSelection)
            click_sound()
        }
        else if ($(this).attr("data-order") == orderCount - 1) {
            currentSelection.splice(currentSelection.length, -1)
            console.log(orderCount)
            orderCount--
        }
    }
})

/////////// PLAN \\\\\\\\\\\\
// After each hover, add an attribute with order count
// Then if user goes backwards, check order number and splice it from array and -1 from count, remove order count attr from unselected letter
// On mouse let go, clear all selection order attr from array


//Clear Box
function clearBox() {
    letterbox.value = ""
    $("tr>td.selected").removeClass("selected")
    $("tr>td.start").removeClass("start")
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
    /// DEBUGGING
    ///
    ///
    /// ONLY
    location.reload()
}

/// Startup
randomise()
checkInternet()