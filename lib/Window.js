'use strict'

const { BrowserWindow } = require('electron');

// Default Window settings
const defaultProps = {
    width: 720,
    height: 480,
    show: false,
    frame: false
};

/**
 * Custom Window class.
 */
class Window extends BrowserWindow {

    /**
     * Constructor
     * @param {Object} param0 
     * @param {String} param0.file File path for the HTML file to load in the window
     * @param {Boolean} param0.openDevTools Open (or not) the developper Tools when the page is loaded
     * @param {Object} param0.windowSettings Additionnary settings for the window (check BrowserWindow doc)
     */
    constructor ({file, openDevTools,  ...windowSettings }) {
        super({ ...defaultProps, ...windowSettings });

        // Load the html file given to the constructor
        this.loadFile(file);

        // Remove the menu
        this.setMenu(null);

        // Open dev tools... or not
        if(openDevTools)
            this.webContents.openDevTools();

        // Show the window once it's fully loaded
        this.once('ready-to-show', () => {
            this.show();
        });
    }
}

module.exports = Window;