import { HorizontalBar } from "react-chartjs-2";
import React from 'react';


const  Horizontal_Bar=(props)=> {

    const options = {
      responsive: true,
      maintainAspectRatio: props.aspectRatio===undefined?true:props.aspectRatio,
      title: {
        display: true,
        text: props.title
    },legend:{
      display:true,
      labels:{
        boxWidth:props.labelwidth===undefined?20:props.labelwidth,
        fontSize:props.labelSize===undefined?12:props.labelSize
      },
      position:props.labelposition===undefined?'right':props.labelposition
    },
      tooltips: {
        mode: 'label'
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
  
            display: true,
            gridLines: {
              display: true,
            }, ticks: {
                beginAtZero: true,
            }
  
  
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
            },ticks: {
              beginAtZero: true,
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
            },ticks: {
                beginAtZero: true,
            },
            labels: {
              show: true
            }
          }
        ]
      }
    };
  
      let data=props.data;
            return (
  
                <HorizontalBar data={data}
                      options={options}/>
  
  
            );
        }
        export default Horizontal_Bar;
