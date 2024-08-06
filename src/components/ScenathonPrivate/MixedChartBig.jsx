import React from 'react';
import { Bar } from 'react-chartjs-2';




const drawMixedChart = (props) => {


  console.log("drawMixedChart props: ", props);
  const options = {
    layout:{padding:{top:0,left:0,right:-10}},
    responsive: true,
    maintainAspectRatio: props.aspectRatio === undefined ? false : props.aspectRatio,
    title: {
      display: false,
      fontSize: props.TitleSize === undefined ? 14 : props.TitleSize,
      position: props.TitlePosition === undefined ? "bottom" : props.TitlePosition,
      text: props.title
    }, legend: {
      display: true,
      labels: {
        boxWidth: 20,
        fontSize: props.labelSize === undefined ? 12 : props.labelSize,
        padding: 8,
      },
      position: props.labelposition === undefined ? 'right' : props.labelposition,
      align: "start",
    }, 
    tooltips: {
      mode: 'label',
      callbacks: {
				label: function (tooltipItem, data) {
          //Save value y in a variable
          var toolValueY = tooltipItem.yLabel
					var label = data.datasets[tooltipItem.datasetIndex].label || '';
          // create a new variable to 0 
          var newToolValueY = 0

          //Math.abs method convert any negative number to positive
          //check the value Y with the following restrictions
          if(Math.abs(toolValueY) > 1000000){
            newToolValueY = toolValueY.toFixed(0)
          }else if(Math.abs(toolValueY) > 1000){
            newToolValueY = toolValueY.toFixed(1)
          }else if(Math.abs(toolValueY) < 1000){
            newToolValueY = toolValueY.toFixed(2)
          }
          
          
        
					return label = label + " " + newToolValueY
				}
			}
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


        }
      ],
      yAxes: [
        {
          stacked: true,
          type: 'linear',
          display: true,
          position: 'left',
          id: 'y-axis-1',

          gridLines:
          {

            display: true,

          }, 
          scaleLabel: {
            display: true,
            labelString: props.labelString === undefined ? '' : props.labelString+ '',
            fontColor: props.fontColor === undefined ? '#546372' : props.fontColor,
            fontSize: props.fontSize === undefined ? 12 : props.fontSize,
            fontFamily: "Montserrat",

          }, ticks: {
            callback: function (label, value, labels) {
              if (label >= 1000000) {

                // return label / 1000000 + ' M';

              } else if (label < 1000000 && label > 50000) {
                // return label / 1000000 + ' M';

              } else if (label < -1000000) {
                // return label / 1000000 + ' M';

              }
              else if (label < 50000) {
                // return label
              }
              return label
            },


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
    <div style={{display:"flex", height:props.chartHeight||'20em',width:props.chartWidth||'65vw', flexDirection: 'column'}}>
    <div style={{display:"flex", height:props.chartHeight,width:'100%'}}>
      <div className="string-label">{props.labelString}</div>
        <Bar data={props.data} options={options} />
    </div>
    <div className="string-title" style={{maxHeight:'10%'}}>{props.title||<></>}</div>
  </div>
  );
}
export default drawMixedChart;