const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld("api", {
    findWord: (word) => ipcRenderer.send('findWord', word)
})

console.log("Preload Loading")