import React from 'react';
import { Bar } from 'react-chartjs-2';

const drawMixedChart = (props) => {


  var xTicksObject = {
    // For a category axis, the val is the index so the lookup via getLabelForValue is needed
    callback: function(val, index) {
      // Hide every 2nd tick label
      return val;
    },
    fontColor: props.fontColor === undefined ? 'black' : props.fontColor,
    fontSize: props.fontSize === undefined ? 18.2 : props.fontSize,
    fontFamily: "proxima-nova, sans-serif",
    lineHeight: 1.5,
    };


  if (props.rotate === true) {

    xTicksObject = Object.assign({}, xTicksObject, {autoSkip: false})
    xTicksObject = Object.assign({}, xTicksObject, {maxRotation: 90})
    xTicksObject = Object.assign({}, xTicksObject, {minRotation: 90})

  }

  const options = {
    layout:{padding:{top:0,left:0,right:0}},
    responsive: true,
    maintainAspectRatio: props.aspectRatio === undefined ? false : props.aspectRatio,
    title: {
      display: false,
      fontSize: props.TitleSize === undefined ? 14 : props.TitleSize,
      position: props.TitlePosition === undefined ? "bottom" : props.TitlePosition,
      text: props.title
    },
    tooltips: {
      callbacks: {
				label: function (tooltipItem, data) {
          //Save value y in a variable
          var toolValueY = tooltipItem.yLabel
					var label = data.datasets[tooltipItem.datasetIndex].label || '';
          // create a new variable to 0 
          var newToolValueY = 0
          //Math.abs method convert any negative number to positive
          //check the value Y with the following restrictions
          newToolValueY = new Intl.NumberFormat("en-En").format(toolValueY);
					return label = label + " " + newToolValueY
				}
			}
    },
    legend: {
      display: true,
      labels: {
        boxWidth: 20,
        fontColor: props.fontColor === undefined ? 'black' : props.fontColor,
				fontSize: props.fontSize === undefined ? 18.2 : props.fontSize,
				fontFamily: "proxima-nova, sans-serif",
				lineHeight: 1.5,
        padding: 8,
      },
      position: props.labelposition === undefined ? 'right' : props.labelposition,
      align: "start",
    }, 
    elements: {
      line: {
        fill: false,
        tension: 0,
        bezierCurve: false


      }
    },
    scales: {
      xAxes: [
        {
          stacked: true,
          // barPercentage: props.barWidth || 1,
          display: true,
          gridLines: {
            display: true
          },
					ticks: xTicksObject


        }
      ],
      yAxes: [
        {
          stacked: true,
          type: 'linear',
          display: true,
          position: 'left',
          id: 'y-axis-1',

          gridLines: {
						display: true,
					},
          scaleLabel: {
						display: true,
						labelString: props.labelString === undefined ? '' : props.labelString,
						
            fontColor: props.fontColor === undefined ? 'black' : props.fontColor,
            fontSize: props.fontSize === undefined ? 18.2 : props.fontSize,
            fontFamily: "proxima-nova, sans-serif",
            lineHeight: 1.5,
					},
          ticks: {
						callback: function (label, index, labels) {

							return new Intl.NumberFormat("en-En").format(label);
						},
            fontColor: props.fontColor === undefined ? 'black' : props.fontColor,
            fontSize: props.fontSize === undefined ? 18.2 : props.fontSize,
            fontFamily: "proxima-nova, sans-serif",
            lineHeight: 1.5,
            max: props.max
					},


          labels: {
            show: true,
            position: 'right',
          }
        },
        {
          type: 'linear',
          display: false,
          position: 'right',
          id: 'y-axis-2',
          gridLines: {
            display: false
          }
          ,
          labels: {
            show: true
          }
        }
      ]
    }
  };

  return (
    <div style={{display:"flex", height:props.chartHeight||'25rem',width:props.chartWidth||'75rem', flexDirection: 'column'}}>      
        <Bar data={props.data} options={options} />
    <div className="string-title" style={{maxHeight:'10%', marginTop: '1.2rem'}}>{props.title||<></>}</div>
  </div>
  );
}
export default drawMixedChart;