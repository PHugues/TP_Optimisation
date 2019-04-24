'use strict'

const { ipcRenderer } = require('electron');

// Listen for the submission of the form
document.getElementById('calcul').addEventListener('submit', (evt) => {
    // Prevent default refresh of the page
    evt.preventDefault();

    // Get the values from the form
    const input  = {  };

    // Send values to main process
    ipcRenderer.send('calcul', input);
});