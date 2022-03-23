var startTime = setInterval(timer, 1000);

async function checkWord(word) {
    const a = await fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + word).then (response => {return response.status})
    return a
}

//Dictionary API Hooker
async function askAPI(word) {
    //console.log(word)
    var table = document.getElementById("queue")
    var row = table.insertRow(1)
    row.insertCell(0).innerHTML = word
    var valid = row.insertCell(1)
    var points = row.insertCell(2)
    valid.innerHTML = "<image src='./assets/loading.gif'></image>"
    points.innerHTML = "<image src='./assets/loading.gif'></image>"
    if (navigator.onLine == true) {
        const status = await checkWord(word)
        if (status == 200){
            Swal.fire({timerProgressBar: true,showConfirmButton: false,timer:1500,toast:true,position:'top',title:"Correct", text:"That was a valid word!", icon:"success"})
            success_sound.play()
            valid.innerHTML = "&#9989"
            var length = word.length
            switch (length){
                case 3: 
                case 4:
                    //1 point
                    totalPoints++
                    points.innerHTML = "1"
                    break;
                case 5:
                    totalPoints+=2
                    //2 points
                    points.innerHTML = "2"
                    break;
                case 6:
                    totalPoints+=3
                    //3 points
                    points.innerHTML = "3"
                    break;
                case 7:
                    totalPoints+=4
                    points.innerHTML = "4"
                    //4 points
                    break;
                default:
                    totalPoints+=11
                    points.innerHTML = "11"
                    // 11 points
                    break;
            }
            pointBox.innerText = totalPoints
        }
        else if (status == 404) {
            Swal.fire({timerProgressBar: true,showConfirmButton: false,timer:1500,toast:true,position:'top',title:"Wrong",text:"Your word failed to pass the dictionary test!", icon:"error"})
            error_sound()
            valid.innerHTML = "&#10060"
            points.innerHTML = "0"
            return false
        }
        else if (status == 503) {
            Swal.fire({title:"Error", text:"The dictionary API is currently experiencing issues. You will be moved into offline mode temporarily during this session.", icon:"warning"})
        }
        else {
            alert("An unknown error has occured!")
        }
    }
    else if (navigator.onLine == false) {
        window.api.findWord(word)
    }
}

async function timer() {
    var t = document.getElementById("timer").innerText
    if (t < 1) {
        clearInterval(startTime)
        stopGame()
    }
    else {
        document.getElementById("timer").innerText = t - 1
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