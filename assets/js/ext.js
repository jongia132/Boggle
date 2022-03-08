async function checkWord(word) {
    const a = await fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + word).then (response => {return response.status})
    return a
}

//Dictionary API Hooker
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

const checkInternet = () => {
    document.getElementById('onlinestatus').innerText = navigator.onLine ? 'Connected':'Disconnected'
}
window.addEventListener('online', checkInternet)
window.addEventListener('offline', checkInternet)