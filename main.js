'use strict'

require('./lib/prototype');

const path = require('path');
const { app, ipcMain, Menu } = require('electron');

const Window = require('./lib/Window');

// Primary function
function main() {
    let windows = new Window({file: path.join('public/views', 'index.html'), openDevTools: false, height: 550});

    ipcMain.on('calcul', (evt, data) => {
        let graph = new Window({file: path.join('public/views', 'echarts.html'), openDevTools: false});
        graph.webContents.send('calcul', data);
        windows.close();
        windows = null;
    });

}

// When Electron is ready, launch the function
app.on('ready', main);

// Close the application once all the windows are closed
app.on('window-all-closed', () => {
    app.quit();
});

var option = {
    xAxis: {
        type: 'value',
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [[120, 120], [130, 130], [140, 140]],
        type: 'line'
    },
    {
        data: [[90, 90], [80, 70], [70, 50]],
        type: 'line'
    }]
};