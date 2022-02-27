const startGame = () => {
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
    const random = []

    /// Randomise Letters, inject into squares
    function randomise() {
        for (let n = 0; n < 16; n++) {
            random.push(letters[n][Math.floor(Math.random() * 5 + 1)])
        }
        shuffle()
        //Shuffle the shuffled array lmaoo
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

    /// Letter Click
    function inputLetter() {
        document.getElementsByTagName("td")
    }
    

    /// Check letter count =/> 3

    /// Lock surrounding squares

    /// Check internet Connection

    const checkInternet = () => {
        document.getElementById('onlinestatus').innerText = navigator.onLine ? 'Connected':'Disconnected'
    }
    window.addEventListener('online', checkInternet)
    window.addEventListener('offline', checkInternet)

    /// Startup
    randomise()
    checkInternet()
}

const resetGame = () => {

}
startGame()