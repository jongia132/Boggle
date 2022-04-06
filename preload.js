const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld("api", {
    findWord: (word) => ipcRenderer.invoke("findWord", word)
})