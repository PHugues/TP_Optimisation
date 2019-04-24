'use strict'

const {
    ipcRenderer
} = require('electron');

// Listen for the submission of the form
document.getElementById('calcul').addEventListener('submit', (evt) => {
    // Prevent default refresh of the page
    evt.preventDefault();

    let x1 = [];
    let x2 = [];
    let symb = [];
    let val = [];

    document.getElementsByName('x1').forEach((element) => {
        x1.push(element.value);
    });

    document.getElementsByName('x2').forEach((element) => {
        x2.push(element.value);
    });

    document.getElementsByName('symb').forEach((element) => {
        symb.push(element.value);
    });

    document.getElementsByName('val').forEach((element) => {
        val.push(element.value);
    });

    // Get the values from the form
    const input = {
        x1: x1,
        x2: x2,
        symb: symb,
        val: val
    };

    // Send values to main process
    ipcRenderer.send('calcul', input);
});

document.getElementById('usefile').addEventListener('submit', (evt) => {
    // Prevent default refresh of the page
    evt.preventDefault();

    // Read the content from the file given
    let reader = new FileReader();
    let file = evt.target[0].files[0];
    reader.onload = (e) => {
        let content = e.target.result.split('\n');
        let val = content[2].split(' ');
        let x1 = [];
        let x2 = [];
        let symb = [];
        for (let i = 3; i < content.length ; i++) {
            let line = content[i].split(' ');
            symb.push("<=");
            x1.push(line[0]);
            x2.push(line[1]);
        }
        let data = {
            x1: x1,
            x2: x2,
            symb: symb,
            val: val
        };
        ipcRenderer.send('calcul', data);
    }
    reader.readAsText(file);

});

document.getElementById('add_cons').addEventListener('click', () => {
    document.getElementById('data').insertAdjacentHTML('beforeend', `<input type="text" class="form-control" name="x1" placeholder="3" size="2" />x1 +<input type="text" class="form-control" name="x2" placeholder="3" size="2" />x2
    <select class="form-control" name="symb">
        <option><=</option>
        <option>>=</option>
    </select>
    <input type="text" class="form-control" name="val" placeholder="3" size="2" required />
    <br /><br />`);
});