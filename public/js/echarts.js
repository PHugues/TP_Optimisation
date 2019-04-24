'use strict'

const { ipcRenderer } = require('electron');
var echarts = require('echarts');
require('../../lib/prototype');

ipcRenderer.on('calcul', (event, data) => {

  // data mocks
  data = {
    val: ["30","15","24"],
    x1: ["1","2","4"],
    x2: ["6", "2", "1"]
  };

  // define max length
  let max = data.val.length;

  // based on prepared DOM, initialize echarts instance
  var myChart = echarts.init(document.getElementById('main'));

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
     
  for(let i = 0; i < max; i++) {
    let results = {
      data : [],
      type: 'line'
    };
    let firstDot = [0,0];
    let secondDot = [0,0];
    firstDot[0] = data.val[i] / data.x1[i];
    secondDot[1] = data.val[i] / data.x2[i];
    results.data.push(firstDot);
    results.data.push(secondDot);
    option.series.push(results);
    
  }
  console.log('option ', option);
  // use configuration item and data specified to show chart
  myChart.setOption(option);
});

