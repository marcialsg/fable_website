import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = (props) => {

	const options = {
		height: '34em',
		responsive: true,
		maintainAspectRatio: props.aspectRatio === undefined ? false : props.aspectRatio,
		title: {
			display: false,
			fontSize: props.TitleSize === undefined ? 15 : props.TitleSize,
			position: props.TitlePosition === undefined ? "bottom" : props.TitlePosition,

			text: props.title
		}, 
		legend: {
			display: props.display === undefined ? true : props.display,
			labels: {
				boxWidth: props.labelwidth === undefined ? 20 : props.labelwidth,
				fontSize: props.labelSize === undefined ? 12 : props.labelSize,
				padding: 8,
			},
			position: 'right',
			align: 'start',

		},
		tooltips: {
			mode: 'index',
			intersect: true,
			bodySpacing: 1,
			padding: 0,
			position: 'nearest',
		},
		elements: {
			line: {
				fill: false
			}
		},
		scales: {
			xAxes: [{
				stacked: true,
				display: true,
				gridLines: {
					display: true,
				},
				ticks: {
					// For a category axis, the val is the index so the lookup via getLabelForValue is needed
					callback: function(val, index) {
					  // Hide every 2nd tick label
					  return val;
					},
					fontColor: props.fontColor === undefined ? '#546372' : props.fontColor,
					fontSize: props.fontSize === undefined ? 18 : props.fontSize
				  }
			}],
			yAxes: [{
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
					fontSize: props.fontSize === undefined ? 18 : props.fontSize,
					// fontFamily: "Montserrat",

				},
				ticks: {
					callback: function (label, index, labels) {

						return label;
					},
					fontColor: props.fontColor === undefined ? '#546372' : props.fontColor,
					fontSize: props.fontSize === undefined ? 18 : props.fontSize
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

	let data;


	if (props.isGrenHouseTwo && props.isChartOne){

		data = props.data.chartOne;

	}else if (props.isGrenHouseTwo && !props.isChartOne) {

		data = props.data.charTwo;

	}else{
		data = props.data;
	}

	return (
		<Bar 
    	data={data}
		options={options} />
	);
}


export default BarChart;