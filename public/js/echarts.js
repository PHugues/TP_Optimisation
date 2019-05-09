'use strict'

const { ipcRenderer } = require('electron');
const echarts = require('echarts');

const graph = require('../js/graphique');
const Simplexe = require('../../lib/Simplexe');
require('../../lib/prototype');

let simplexe;

// Receive the event "calcul" from the server
ipcRenderer.on('calcul', (event, data) => {
    simplexe = new Simplexe(data);
    buildGraph(data);
    buildSimplexeTab(simplexe, true);
});

/**
 * Build the graph and display it
 * @param {Object} data Set of data received from the server
 * @param {Array<String>} data.x1 Set of x1 values
 * @param {Array<String>} data.x2 Set of x2 values
 * @param {Array<String>} data.val Set of values
 * @param {Object} data.obj Objective function
 */
function buildGraph(data) {
    // define max length
    let max = data.val.length;

    // based on prepared DOM, initialize echarts instance
    let myChart = echarts.init(document.getElementById('graph'), 'dark');

    //define area to color
    let dots = graph.isAvailable(graph.intersection(data.x1, data.x2, data.val), data.x1, data.x2, data.val);

    if (dots.isEmpty()) {
        alert('Aucune solution.');
        $('#stepSimp').attr("disabled", true);
        $('#resSimp').attr("disabled", true);
    }

    //define size max for each axis
    let xsizeMax = 0;
    let ysizeMax = 0;

    // specify chart configuration item and data
    let option = {
        title: {
            text: 'Graphique',
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            data: ["Zone admissible", "Gradient"]
        },
        xAxis: {
            name: 'x1',
            type: 'value',
        },
        yAxis: {
            name: 'x2',
            type: 'value'
        },
        series: []
    };

    // initialization of the area to draw
    let area = {
        name: "Zone admissible",
        data: null,
        type: 'line',
        areaStyle: {}
    };
    area.data = dots;

    // Variables to sort the dots
    // This will help us in order to draw the area
    let xAxis = [];
    let yAxis = [];
    let xyAxis = [];
    let admissibilityArea = [];

    // Initialization sorts variables
    area.data.forEach((dot) => {
        if (dot[0] < dot[1]) { // Dots closer to x axis
            xAxis.push(dot);
        } else if (dot[0] > dot[1]) { // Dots closer to y axis
            yAxis.push(dot);
        } else if (dot[0] == dot[1]) { // Dots that are on x=y right
            xyAxis.push(dot);
        }
    });

    //Temporary variable to sort
    let insertion = [];

    //Sort axis
    xAxis.forEach((dot) => {
        if (insertion.isEmpty()) { // If empty we fill the array
            insertion.push(dot);
        } else { // If the array is not empty then we sort the dots
            let i = null;
            try { // We define where the dot has to be in the array
                insertion.forEach((insertDot, index) => {
                    if (insertDot[0] === dot[0]) {
                        if (insertDot[1] <= dot[1]) {
                            i = index + 1;
                            throw Error();
                        } else {
                            i = index;
                            throw Error();
                        }
                    }
                    if (insertDot[0] > dot[0]) {
                        i = index;
                        throw Error();
                    }
                });
            } catch (e) {

            }
            // We put the dot at the great place
            if (i === null) { // We put the dot at the great place
                insertion.push(dot);
            } else {
                insertion.splice(i, 0, dot);
            }
        }
    });

    xAxis = insertion;
    insertion = [];

    yAxis.forEach((dot) => {
        if (insertion.isEmpty()) { // If empty we fill the array
            insertion.push(dot);
        } else { // If the array is not empty then we sort the dots
            let i = null;
            try { // We define where the dot has to be in the array
                insertion.forEach((insertDot, index) => {
                    if (insertDot[1] === dot[1]) {
                        if (insertDot[0] <= dot[0]) {
                            i = index;
                            throw Error();
                        } else {
                            i = index + 1;
                            throw Error();
                        }
                    }
                    if (insertDot[1] < dot[1]) {
                        i = index;
                        throw Error();
                    }
                });
            } catch (e) {

            }
            // We put the dot at the great place
            if (i === null) {
                insertion.push(dot);
            } else {
                insertion.splice(i, 0, dot);
            }
        }
    });

    yAxis = insertion;
    insertion = [];

    xyAxis.forEach((dot) => {
        if (insertion.isEmpty()) { // If empty we fill the array
            insertion.push(dot);
        } else { // If the array is not empty then we sort the dots
            let i = null;
            try { // We define where the dot has to be in the array
                insertion.forEach((insertDot, index) => {
                    if (insertDot[0] > dot[0]) {
                        i = index;
                        throw Error();
                    }
                });
            } catch (e) {

            }
            // We put the dot at the great place
            if (i === null) {
                insertion.push(dot);
            } else {
                insertion.splice(i, 0, dot);
            }
        }
    });

    xyAxis = insertion;
    insertion = [];

    // Build the area
    xAxis.forEach((dot) => {
        admissibilityArea.push(dot);
    });
    yAxis.forEach((dot) => {
        admissibilityArea.push(dot);
    });
    insertion = admissibilityArea;


    xyAxis.forEach((dot) => {
        let i = null;
        try { // We define where the dot needs to be placed
            admissibilityArea.forEach((adminDot, index) => {
                if (dot[0] <= adminDot[0]) {
                    i = index;
                    throw Error(); // Break the foreach loop
                }
            });
        } catch (e) {
            // Do nothing
        }
        // We put the dot at the great place
        if (i !== null) {
            insertion.splice(i, 0, dot);
        } else {
            insertion.push(dot);
        }

        admissibilityArea = insertion;
    });

    // Set the area
    area.data = admissibilityArea;

    option.series.push(area);

    // We define the space needed to drawn our rights
    for (let i = 0; i < max; i++) {

        let results = {
            name: `c${i+1}`,
            data: [],
            type: 'line'
        };

        option.legend.data.push(results.name);

        let firstDot = [0, 0];
        let secondDot = [0, 0];

        firstDot[0] = data.val[i] / data.x1[i];
        secondDot[1] = data.val[i] / data.x2[i];

        // Case when line is parallel to the x2 line
        if (Math.abs(secondDot[1]) === Infinity) {
            secondDot[1] = xsizeMax;
            secondDot[0] = firstDot[0];
        }

        // Case when line is parallel to the x1 line
        if (Math.abs(firstDot[0]) === Infinity) {
            firstDot[0] = data.val[i] / data.x2[i] > ysizeMax ? data.val[i] / data.x2[i] : ysizeMax;
            firstDot[1] = data.val[i] / data.x2[i];
        }
        // Define the maximum size needed for the graph
        if (firstDot[0] > xsizeMax) {
            xsizeMax = firstDot[0];
        }
        if (secondDot[1] > ysizeMax) {
            ysizeMax = secondDot[1];
        }

        results.data.push(firstDot);
        results.data.push(secondDot);
        option.series.push(results);
    }

    // Define gradient
    if (!(data.obj.isEmpty()) && !(String.IsNullOrEmpty(data.obj.x1))) {
        let gradient = {
            name: "Gradient",
            data: null,
            type: 'line',
        };

        let xdot = [xsizeMax * 1.05, data.obj.x2 * xsizeMax / data.obj.x1 * 1.05];
        let ydot = [data.obj.x1 * ysizeMax / data.obj.x2 * 1.05, ysizeMax * 1.05];

        gradient.data = [
            [0, 0], xdot, ydot
        ];
        option.series.push(gradient);
    }

    // use configuration item and data specified to show chart
    myChart.setOption(option);
}

/**
 * Build the tab from the simplexe
 * @param {Simplexe} simplexe Simplexe instance to transform in a tab
 * @param {Boolean} init First time we build the tab
 */
function buildSimplexeTab(simplexe, init) {
    let html = "";

    for (let i = 0; i < simplexe.nbConstraint; i++) {
        // Insert the names of the newly introduced variables
        if (init) {
            $(`<th>e${simplexe.nbConstraint-i}</th>`).insertAfter('#headX2');
        }

        // Add the lines
        html += `<tr><td>${simplexe.inBase[i]}`;
        for (let column of simplexe.tab) {
            html += `<td>${column.val[i]}</td>`
        }
        html += "</tr>"
    }

    html += `<tr><td>MAX</td>`
    for (let column of simplexe.tab) {
        html += `<td>${column.val[simplexe.nbConstraint]}</td>`
    }
    $('#tableBody').html(html);
}

// Click on next step
$('#stepSimp').click(() => {
    $('#stepSimp').attr("disabled", true);
    simplexe.changeState();
    buildSimplexeTab(simplexe, false);
    $('#stepSimp').removeAttr("disabled");
});

// Click on resolve simplexe
$('#resSimp').click(() => {
    $('#resSimp').attr("disabled", true);
    let data = simplexe.simplexMethod();
    buildSimplexeTab(simplexe, false);
    $('#resSimp').removeAttr("disabled");
    let html = `<hr width="auto" color="grey" />Point optimal :<br/>x1 = ${data.x1}<br/>x2 = ${data.x2}`
    $('#simp').append(html);
});