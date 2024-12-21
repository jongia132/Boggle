async function checkWord(word) {
    const status = (await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)).status;
    if (status == 200) return true;

    return false;
}

// Dictionary API Hooker
async function askAPI(word) {
    var table = document.getElementById("queue");
    var row = table.insertRow(1);
    row.insertCell(0).innerHTML = word;
    var valid = row.insertCell(1);
    var points = row.insertCell(2);
    valid.innerHTML = "<div class='spinner-border spinner-border-sm' role='status'><span class='visually-hidden'>Loading...</span></div>";
    points.innerHTML = "<div class='spinner-border spinner-border-sm' role='status'><span class='visually-hidden'>Loading...</span></div>";
    if (await checkWord(word) == true) {
        Swal.fire({ timerProgressBar: true, showConfirmButton: false, timer: 1500, toast: true, position: 'top', title: "Correct", icon: "success" })
        success_sound.play();
        valid.innerHTML = "&#9989";
        switch (word.length) {
            case 3:
            case 4:
                // 1 point
                totalPoints++;
                points.innerHTML = "1";
                break;
            case 5:
                totalPoints += 2;
                // 2 points
                points.innerHTML = "2";
                break;
            case 6:
                totalPoints += 3;
                // 3 points
                points.innerHTML = "3";
                break;
            case 7:
                totalPoints += 4;
                points.innerHTML = "4";
                // 4 points
                break;
            default:
                totalPoints += 11;
                points.innerHTML = "11";
                // 11 points
                break;
        }
        pointBox.innerText = totalPoints;
    }
    else {
        Swal.fire({ timerProgressBar: true, showConfirmButton: false, timer: 1500, toast: true, position: 'top', title: "Invalid word", icon: "error" });
        error_sound();
        valid.innerHTML = "&#10060";
        points.innerHTML = "0";

        return false;
    }
}

async function timer() {
    let time = document.getElementById("timer").innerText;

    if (time < 1) {
        clearInterval(startTime);
        stopGame();
    } else {
        document.getElementById("timer").innerText = time - 1;
    }
}


// else if (status == 404) {
//     Swal.fire({timerProgressBar: true,showConfirmButton: false,timer:1500,toast:true,position:'top',title:"Wrong",text:"Your word failed to pass the dictionary test!", icon:"error"})
//     error_sound()
//     valid.innerHTML = "&#10060"
//     points.innerHTML = "0"
//     return false
// }
// else if (status == 503) {
//     Swal.fire({title:"Error", text:"The dictionary API is currently experiencing issues. You will be moved into offline mode temporarily during this session.", icon:"warning"})
// }
