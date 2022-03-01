const {app,BrowserWindow} = require("electron");
const {path} = require("path");

const createWindow = () => {
    const window = new BrowserWindow({})

    window.loadFile("boggle.html")
}

app.whenReady().then(() => {
    createWindow()
})