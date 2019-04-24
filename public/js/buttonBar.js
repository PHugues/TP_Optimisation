'use strict'

const remote = require('electron').remote;

function init() {
    document.getElementById("min-btn").addEventListener("click", (event) => {
        const window = remote.getCurrentWindow();
        window.minimize();
    });

    document.getElementById("max-btn").addEventListener("click", (event) => {
        const window = remote.getCurrentWindow();
        if (!window.isMaximized()) {
            window.maximize();
        } else {
            window.unmaximize();
        }
    });

    document.getElementById("close-btn").addEventListener("click", (event) => {
        const window = remote.getCurrentWindow();
        window.close();
    });
};

document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        init();
    }
};
