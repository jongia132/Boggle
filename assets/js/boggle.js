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
    const random_step1 = []
    const random_step2 = []

    /// Randomise Letters
    function randomise() {
        for (let n = 0; n < 16; n++) {
            random_step1.push(letters[n][Math.floor(Math.random() * 5 + 1)])
            console.log(random_step1[n], 'Step 1 ')
        }
        for (let c = 0; c < 16; c++) {
            var rn = Math.floor(Math.random() * (15 - c) + 1)
            random_step2.push(random_step1[rn])
            console.table(random_step2)
            random_step1.splice(rn)
        }
        //Random select from array and set as new array
    }

    /// Timer

    /// Create Array

    /// Inject into squares

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

startGame()