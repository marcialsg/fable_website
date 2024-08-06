import React from "react";
import { Bar } from "react-chartjs-2";
import Typography from "@material-ui/core/Typography";

const GhgStackedChart = (props) => {
  const getItemTypography = (text, color) => {
    return (
      <Typography variant="h5" style={{ color }}>
        {text}
      </Typography>
    );
  };

  const options = {
    responsive: true,
    maintainAspectRatio:
      props.aspectRatio === undefined ? false : props.aspectRatio,
    title: {
      /* display: true, */
      fontSize: props.TitleSize === undefined ? 15 : props.TitleSize,
      position:
        props.TitlePosition === undefined ? "bottom" : props.TitlePosition,
      text: props.title,
    },
    legend: {
      display: props.display === undefined ? true : props.display,
      labels: {
        boxWidth: props.labelwidth === undefined ? 20 : props.labelwidth,
        fontColor: props.fontColor === undefined ? "black" : props.fontColor,
        fontSize: props.fontSize === undefined ? 18 : props.fontSize,
        fontFamily: "proxima-nova, sans-serif",
        lineHeight: 1.5,
        padding: 8,
      },
      position:
        props.labelposition === undefined ? "right" : props.labelposition,
      align: "start",
    },
    tooltips: {
      mode: 'index',
			intersect: true,
			padding:0,
			bodySpacing:1,
			position: 'nearest',
      callbacks: {
        label: function (tooltipItem, data) {
          //Save value y in a variable
          var toolValueY = tooltipItem.yLabel;
          var label = data.datasets[tooltipItem.datasetIndex].label || "";
          // create a new variable to 0
          var newToolValueY = 0;
          //Math.abs method convert any negative number to positive
          //check the value Y with the following restrictions
          newToolValueY = new Intl.NumberFormat("en-En").format(toolValueY);

          return (label = label + ": " + newToolValueY);
        },
      },
    },
    layout: {
      padding: {
        bottom: 0,
      },
    },
    hover: {
      mode: "index",
      intersect: true,
      animationDuration: 1000,
    },
    elements: {
      line: {
        fill: false,
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
          ticks: {
            // For a category axis, the val is the index so the lookup via getLabelForValue is needed
            callback: function (val, index) {
              // Hide every 2nd tick label
              return val;
            },
            fontColor:
              props.fontColor === undefined ? "black" : props.fontColor,
            fontSize: props.fontSize === undefined ? 18.2 : props.fontSize,
            fontFamily: "proxima-nova, sans-serif",
            lineHeight: 1.5,
          },
        },
      ],
      yAxes: [
        {
          stacked: true,
          type: "linear",
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
              props.fontColor === undefined ? "black" : props.fontColor,
            fontSize: props.fontSize === undefined ? 18.2 : props.fontSize,
            fontFamily: "proxima-nova, sans-serif",
            lineHeight: 1.5,
          },
          ticks: {
            callback: function (label, index, labels) {
              return new Intl.NumberFormat("en-En").format(label);
            },
            fontColor:
              props.fontColor === undefined ? "black" : props.fontColor,
            fontSize: props.fontSize === undefined ? 18.2 : props.fontSize,
            fontFamily: "proxima-nova, sans-serif",
            lineHeight: 1.5,
            max: props.max,
            min: props.min,
          },
          labels: {
            show: true,
            position: "right",
          },
        },
        {
          type: "linear",
          display: false,
          position: "right",
          id: "y-axis-2",
          gridLines: {
            display: false,
          },
          labels: {
            show: true,
          },
        },
      ],
    },
  };

  return (
    <div style={{display:"flex", height:props.chartHeight||'25rem',width:props.chartWidth||'75rem', flexDirection: 'column'}}>
      <Bar data={props.data} options={options} />
      <div className="string-title" style={{maxHeight:'10%', marginTop:'1.2rem'}}>{props.title||<></>}</div>
    </div>
  );
};

export default GhgStackedChart;
