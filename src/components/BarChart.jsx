import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = (props) => {

  const options = {

    height: '34em',
    responsive: true,
    maintainAspectRatio: props.aspectRatio === undefined ? false : props.aspectRatio,
    title: {
      display: false,
      fontSize: props.TitleSize || 15,
      position: props.TitlePosition === undefined ? "bottom" : props.TitlePosition,

      text: props.title
    }, legend: {
      display: props.display === undefined ? true : props.display,
      labels: {
        boxWidth: props.labelwidth === undefined ? 20 : props.labelwidth,
        fontSize: props.labelSize === undefined ? 12 : props.labelSize,
        padding: 8,
      },
      position: props.labelposition === undefined ? 'right' : props.labelposition,
      align: "start",

    },
    tooltips: {
      mode: 'index',
      intersect: true,
      padding: 0,
      bodySpacing: 1,
      position: 'nearest',
      callbacks: {
        label: function (tooltipItem, data) {
          var toolValueY = tooltipItem.yLabel
          var label = data.datasets[tooltipItem.datasetIndex].label || '';

          var newtoolValueY = 0
          if (toolValueY > 1000000) {
            newtoolValueY = toolValueY.toFixed(0)
          } else if (toolValueY > 1000) {
            newtoolValueY = toolValueY.toFixed(1)
          }
          else if (toolValueY < 1000) {
            newtoolValueY = toolValueY.toFixed(2)
          }

          return label = label + " " + newtoolValueY
          
        }
      }
    },
    elements: {
      line: {
        fill: false
      }
    },
    scales: {
      xAxes: [
        {
          stacked: true,
          // barPercentage: props.barWidth||1,
          display: true,
          gridLines: {
            display: true,
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
          gridLines: {
            display: true,
          }, scaleLabel: {
            display: true,
            labelString: props.labelString === undefined ? '' : props.labelString,
            fontColor: props.fontColor === undefined ? '#546372' : props.fontColor,
            fontSize: props.fontSize === undefined ? 12 : props.fontSize,
            fontFamily: "Montserrat",

          }, ticks: {
            callback: function (label, value, labels) {
              if (label >= 1000000) {

                // return label / 1000000 + ' M';

              } else if (label < 1000000 && label > 100000) {
                // return label / 1000 + ' K';

              }
              else {
                // return label
              }
              return label;
            },


          },

          labels: {
            show: true,
            position: 'right',
          },
        },
        {
          type: 'linear',
          display: false,
          position: 'right',
          id: 'y-axis-2',
          gridLines: {
            display: false
          },
          labels: {
            show: true
          }
        }
      ]
    }
  };

  return (
    <div class="prueba">
        <Bar data={props.data} options={options} />
      <div className="string-title" style={{ maxHeight: '10%' }}>{props.title || <></>}</div>
    </div>
  );
}


export default BarChart;