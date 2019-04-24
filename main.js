'use strict'

require('./lib/prototype');

const path = require('path');
const { app, ipcMain, Menu } = require('electron');

const Window = require('./lib/Window');

// Primary function
function main() {
    let windows = new Window({file: path.join('public/views', 'index.html'), openDevTools: false});

    ipcMain.on('calcul', (evt, data) => {
    
    });
}

// When Electron is ready, launch the function
app.on('ready', main);

// Close the application once all the windows are closed
app.on('window-all-closed', () => {
    app.quit();
});