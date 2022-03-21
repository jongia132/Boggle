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
var totalPoints = 0
var pointBox = document.getElementById("currentScore")
var cache = []

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
    $(".box").removeClass("selected")
    $(".box").removeClass("start")
    $(this).addClass("start")
    $(this).attr("data-order", "0")
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

$("#grid").mouseup(function(e) {
    if (e.which == 1) {
        mouseDown = false
        console.log("Mouseup")
        $(".box").removeAttr("data-order");
        if (orderCount < 2) {
            letterbox.value = null
            $(".box").removeClass("selected")
            $(".box").removeClass("start")
            currentSelection = []
            error_sound()
        }
        else if (cache.includes(letterbox.value)) {
            Swal.fire({timerProgressBar: true,showConfirmButton: false,toast: true,position: 'top-right',customClass: {container:"position-absolute"},timer: 1500,title:"Duplicate", text:"Word already exists!", icon:"error"})
        }
        else {
            var WordCount = letterbox.value.length
            if (WordCount < 16, WordCount > 2) {
                console.log("Requirements met!")
                // Add word to queue
                cache.push(letterbox.value)
                askAPI(letterbox.value)
            }
        }
        clearBox()
        orderCount = 0
    }
})

//Cancel submit event by hovering out of grid
$("body").mouseup(function(e) {
    if (e.which == 1) {
        mouseDown = false
        clearBox()
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
            $("[data-order='"+ orderCount +"']").removeClass("selected")
            currentSelection.slice(0, -1)
            orderCount--
            console.log(orderCount)
            letterbox.value = letterbox.value.slice(0, -1)
            click_sound()
        }
    }
})

//Clear Box
function clearBox() {
    letterbox.value = null
    $(".box").removeClass("selected")
    $(".box").removeClass("start")
    currentSelection = []
}

function resetGame() {
    randomise()
    clearBox()
    cache = []
    /// DEBUGGING
    ///
    ///
    /// ONLY
    location.reload()
}

/// Startup
randomise()
checkInternet()