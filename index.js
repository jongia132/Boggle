const {app,BrowserWindow} = require("electron");

const createWindow = () => {
    const window = new BrowserWindow({})

    window.loadFile("index.html")
}

app.whenReady().then(() => {
    createWindow()
})