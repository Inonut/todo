/**
 * Created by Dragos on 28.09.2016.
 */

const {app, BrowserWindow} = require('electron')

let win

function createWindow () {
    win = new BrowserWindow({width: 1200, height: 900})
    win.loadURL(`file://${__dirname}/index.html`)
    win.webContents.openDevTools()
    win.on('closed', () => {
        win = null
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})
