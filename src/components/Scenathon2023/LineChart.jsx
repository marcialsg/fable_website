import React from "react";
import { Line } from "react-chartjs-2";
//draw triple style chart
const drawLine = (props) => {
  const options = {
    responsive: true,
    maintainAspectRatio:
      props.aspectRatio === undefined ? false : props.aspectRatio,
    legend: {
      display: true,
      labels: {
        boxWidth: props.labelwidth === undefined ? 20 : props.labelwidth,
        fontSize: props.labelSize === undefined ? 12 : props.labelSize,
        padding: 8,
      },
      position:
        props.labelposition === undefined ? "right" : props.labelposition,
      align: "start",
    },
    elements: {
      line: {
        fill: false,
        tension: 0,
        bezierCurve: false,
      },
    },
    scales: {
      xAxes: [
        {
          stacked: true,
          display: true,
          gridLines: {
            display: true,
          },
        },
      ],
      yAxes: [
        {
          stacked: true,
          // type: "linear",
          display: true,
          position: "left",
          id: "y-axis-1",
          gridLines: {
            display: true,
          },
          scaleLabel: {
            display: true,
            labelString:
              props.labelString === undefined ? "" : props.labelString,
            fontColor:
              props.fontColor === undefined ? "#546372" : props.fontColor,
            fontSize: props.fontSize === undefined ? 14 : props.fontSize,
            fontFamily: "Montserrat",
          },

          labels: {
            show: true,
            usePointStyle: true,
          },
        },
      ],
    },
  };

  //  let data = props.data;
  return (
    <div
      style={{
        display: "flex",
        height: props.chartHeight || "35em",
        width: props.chartWidth || "80rem",
        flexDirection: "row",
      }}
    >
      <div
        style={{ display: "flex", height: props.chartHeight, width: "80rem" }}
      >
        <Line options={options} data={props.data} />
      </div>
      <div className="string-title" style={{ maxHeight: "10%" }}>
        {props.title || <></>}
      </div>
    </div>
  );
};
export default drawLine;
