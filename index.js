const {app,BrowserWindow} = require("electron");

const createWindow = () => {
    const window = new BrowserWindow({})

    window.loadFile("boggle.html")
}

app.whenReady().then(() => {
    createWindow()
})