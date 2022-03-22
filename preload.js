const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld("api", {
    findWord: () => ipcRenderer.send("word")
})

console.log("Preload Loading")