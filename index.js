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
    window.webContents.openDevTools()
    ipcMain.handle("findWord", async (event, word) => {
        fs.readFile("./assets/word-list.txt", (err, data) => {
            var search = new RegExp('\n'+word+'\n')
            if (err) {
                throw err
            }
            else if (search.test(data) == true) {
                return true
            }
            else {
                return false
            }
        })
        return
    })
}

// Menubar
// Menu.setApplicationMenu()

app.whenReady().then(() => {
    createWindow()
})