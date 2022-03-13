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
            Swal.fire({title:"Correct", text:"That was a valid word!", icon:"success"})
            success_sound.play()
            return true
        }
        else if (status == 404) {
            Swal.fire({title:"Wrong",text:"Your word failed to pass the dictionary test!", icon:"error"})
            error_sound()
            return false
        }
        else if (status == 503) {
            Swal.fire({title:"Error", text:"The dictionary API is currently experiencing issues. You will be moved into offline mode temporarily during this session.", icon:"warning"})
        }
        else {
            alert("An unknown error has occured!")
        }
    }
    else {
        alert("Online Functionality Not Available")
    }
}

// Disable Selecting
const disableSelect = () => {
    return false
}
document.onselect = disableSelect
document.onmousedown = disableSelect


const checkInternet = () => {
    document.getElementById('onlinestatus').innerText = navigator.onLine ? 'Connected':'Disconnected'
}
window.addEventListener('online', checkInternet)
window.addEventListener('offline', checkInternet)