const {app,BrowserWindow, Menu, ipcMain} = require("electron");
const path = require("path");
const fs = require('fs');

const createWindow = () => {
    const window = new BrowserWindow({
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    })
    window.loadFile("boggle.html")


    ipcMain.handle("findWord", async (event, word) => {
        fs.readFile("./assets/word-list.txt", function (err, data) {
            if (err)
                throw err;
            if (data.includes(word.toLowerCase())) {
                console.log('true');
                return true;
            }
            else {
                console.log('false');
                return false;
            }
        })
    })
}

//Menubar
//Menu.setApplicationMenu()

app.whenReady().then(() => {
    createWindow()
})