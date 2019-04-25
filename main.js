'use strict'

require('./lib/prototype');

const path = require('path');
const { app, ipcMain } = require('electron');

const Window = require('./lib/Window');

// Primary function
function main() {
    let windows = new Window({file: path.join('public/views', 'index.html'), openDevTools: false, height: 580});

    ipcMain.on('calcul', (evt, data) => {
        let graph = new Window({file: path.join('public/views', 'echarts.html'), openDevTools: true, height: 600});
        graph.once('show', (evt2, data2) => {
            graph.maximize();
            graph.webContents.send('calcul', data);
            windows.close();
            windows = null;
        })
    });

}

// When Electron is ready, launch the function
app.on('ready', main);

// Close the application once all the windows are closed
app.on('window-all-closed', () => {
    app.quit();
});