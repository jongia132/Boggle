const {app,BrowserWindow, Menu} = require("electron");
const {path} = require("path");
const createWindow = () => {
    const window = new BrowserWindow({
        autoHideMenuBar: true,
    })

    window.loadFile("boggle.html")
}

//Menubar
Menu.setApplicationMenu()




app.whenReady().then(() => {
    createWindow()
})