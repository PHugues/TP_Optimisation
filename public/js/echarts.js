'use strict'

const { ipcRenderer } = require('electron');
var echarts = require('echarts');
require('../../lib/prototype');

ipcRenderer.on('calcul', (event, data) => {
    // define max length
    let max = data.val.length;

    // based on prepared DOM, initialize echarts instance
    var myChart = echarts.init(document.getElementById('main'), 'dark');

    // specify chart configuration item and data
    var option = {
        title: {
            text: 'Représentation graphique'
        },
        xAxis: {
            type: 'value',
        },
        yAxis: {
            type: 'value'
        },
        series: []
    };

    for (let i = 0; i < max; i++) {
        let results = {
            data: [],
            type: 'line'
        };
        let firstDot = [0, 0];
        let secondDot = [0, 0];
        firstDot[0] = data.val[i] / data.x1[i];
        secondDot[1] = data.val[i] / data.x2[i];
        results.data.push(firstDot);
        results.data.push(secondDot);
        option.series.push(results);

    }

    // use configuration item and data specified to show chart
    myChart.setOption(option);
});