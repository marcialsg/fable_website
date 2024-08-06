import React from 'react';
import { Bar } from 'react-chartjs-2';

//draw triple style chart
const drawSuperGraph = (props) => {

  const options = {
    responsive: true,
    maintainAspectRatio: props.aspectRatio === undefined ? false : props.aspectRatio,
    title: {
      display: false,
      fontSize: props.TitleSize === undefined ? 15 : props.TitleSize,
      position: props.TitlePosition === undefined ? "bottom" : props.TitlePosition,
      text: props.title
    }, legend: {
      display: true,
      labels: {
        boxWidth: props.labelwidth === undefined ? 20 : props.labelwidth,
        fontSize: props.labelSize === undefined ? 12 : props.labelSize,
        padding: 8,
      },
      position: props.labelposition === undefined ? 'right' : props.labelposition,
      align: 'start',
    }, tooltips: {
      mode: 'label'
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
          gridLines: {
            display: true,
          },
          scaleLabel: {
            display: true,
            labelString: props.labelString === undefined ? '' : props.labelString,
            fontColor: props.fontColor === undefined ? '#546372' : props.fontColor,
            fontSize: props.fontSize === undefined ? 13 : props.fontSize,
            fontFamily: "Montserrat",

          },

          labels: {
            show: true,
            usePointStyle: true,

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

  //  let data = props.data;
  return (
    <div class="prueba">
      <Bar data={props.data} options={options} />
      <div className="string-title" style={{ maxHeight: '500px' }}>{props.title || <></>}</div>
    </div>
  );
}
export default drawSuperGraph;