'use strict'

const { ipcRenderer } = require('electron');
const echarts = require('echarts');
const graph = require('../js/graphique');
require('../../lib/prototype');

ipcRenderer.on('calcul', (event, data) => {
    // define max length
    let max = data.val.length;

    // based on prepared DOM, initialize echarts instance
    let myChart = echarts.init(document.getElementById('main'), 'dark');

    //define area (51) to color
    let dots = graph.isAvailable(graph.intersection(data.x1, data.x2, data.val), data.x1, data.x2, data.val);

    //define sizes max for each axsis
    let xsizeMax = 0;
    let ysizeMax = 0;

    // specify chart configuration item and data
    let option = {
        title: {
            text: 'Représentation graphique'
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
        xAxis: {
            type: 'value',
        },
        yAxis: {
            type: 'value'
        },
        series: []
    };

    // initialization of the area to draw
    let area = {
        data: null,
        type: 'line',
        areaStyle: {}
    };
    area.data = dots;
    console.log("dots ", dots);
    
    //Variables to sort dots
    let xAxis = [];
    let yAxis = [];
    let xyAxis = [];
    let adminisibilityArea = [];

    // Initialization sorts variables
    area.data.forEach((dot)=> {
        if(dot[0] < dot[1]){
            xAxis.push(dot);
        } else if(dot[0] > dot[1]) {
            yAxis.push(dot);

        } else if(dot[0] == dot[1]){
            xyAxis.push(dot);
        }
    });

    //Temporary variable to sort
    let insertion = [];

    //Sort axis
    xAxis.forEach((dot) => {
        if(insertion.isEmpty()){
            insertion.push(dot);
        } else {
            let i = null;
            try{
                insertion.forEach((insertDot, index) => {
                    if(insertDot[0] === dot[0]){
                        if(insertDot[1] <= dot[1]){
                            i = index + 1;
                            throw Error();
                        } else {
                            i = index ;
                            throw Error();
                        }
                    }
                    if(insertDot[0] > dot[0]){
                        i = index;
                        throw Error();
                    } 
                });
            } catch(e) {
                
            }

            if(i === null ){
                insertion.push(dot);
            } else {
                insertion.splice(i,0,dot);
            }
        }
    });

    xAxis = insertion;
    insertion = [];

    yAxis.forEach((dot) => {
        if(insertion.isEmpty()){
            insertion.push(dot);
        } else {
            let i = null;
            try{
                insertion.forEach((insertDot, index) => {
                    if(insertDot[1] === dot[1]){
                        if(insertDot[0] <= dot[0]){
                            i = index;
                            throw Error();
                        } else {
                            i = index + 1;
                            throw Error();
                        }
                    }
                    if(insertDot[1] < dot[1]){
                        i = index;
                        throw Error();
                    } 
                });
            } catch(e) {
                
            }

            if(i === null ){
                insertion.push(dot);
            } else {
                insertion.splice(i,0,dot);
            }
        }
    });

    yAxis = insertion;
    insertion = [];

    xyAxis.forEach((dot) => {
        if(insertion.isEmpty()){
            insertion.push(dot);
        } else {
            let i = null;
            try{
                insertion.forEach((insertDot, index) => {
                    if(insertDot[0] > dot[0]){
                        i = index;
                        throw Error();
                    } 
                });
            } catch(e) {
                
            }

            if(i === null ){
                insertion.push(dot);
            } else {
                insertion.splice(i,0,dot);
            }
        }
    });

    xyAxis = insertion;
    insertion = [];

    // Build the area
    xAxis.forEach((dot) => {
        adminisibilityArea.push(dot);
    });
    yAxis.forEach((dot) => {
        adminisibilityArea.push(dot);
    });
    insertion = adminisibilityArea;


    let i = null;
    xyAxis.forEach((dot) => {
        try {
            adminisibilityArea.forEach((adminDot, index) => {
                if(dot[0] <= adminDot[0]){
                    i = index;
                    throw Error();
                }  
            });
        } catch (e) {

        } 

    if(i !== null) {
        insertion.splice(i,0,dot);
    } else {
        insertion.push(dot);
    }

        adminisibilityArea = insertion;
    });

    console.log('xyAxis : ', xyAxis);
    console.log('yAxis : ', yAxis);
    console.log('xAxis : ', xAxis);
    console.log('admin : ', adminisibilityArea);

    area.data = adminisibilityArea;

    option.series.push(area);

    for (let i = 0; i < max; i++) {

        let results = {
            data: [],
            type: 'line'
        };

        let firstDot = [0, 0];
        let secondDot = [0, 0];

        firstDot[0] = data.val[i] / data.x1[i];
        secondDot[1] = data.val[i] / data.x2[i];

        // Case when line is parallel to the x2 line
        if(Math.abs(secondDot[1]) === Infinity) {
            secondDot[1] = xsizeMax;
            secondDot[0] = firstDot[0];
        }

        // Case when line is parallel to the x1 line
        if(Math.abs(firstDot[0]) === Infinity) {
            firstDot[0] = data.val[i] / data.x2[i] > ysizeMax ? data.val[i] / data.x2[i] : ysizeMax;
            firstDot[1] = data.val[i] / data.x2[i];
        }

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
});