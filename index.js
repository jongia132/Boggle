const {app,BrowserWindow, Menu, ipcMain} = require("electron");
const path = require("path");
const fs = require('fs');
var validity = null
const createWindow = () => {
    const window = new BrowserWindow({
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    })
    window.loadFile("boggle.html")
    ipcMain.handle("findWord", async (event, word) => {
        fs.readFile(path.join(__dirname, "assets/word-list.txt"), (err, data) => {
            var search = new RegExp('\n'+word+'\n')
            if (err) {
                throw err
            }
            else if (search.test(data) == true) {
                validity = true
            }
            else {
                validity = false
            }
        })
        await sleep(100)
        return validity
    })
}
function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}
// Menubar
Menu.setApplicationMenu()

app.whenReady().then(() => {
    createWindow()
})