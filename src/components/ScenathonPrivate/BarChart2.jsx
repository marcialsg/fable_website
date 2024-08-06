import React from 'react';
import { Bar } from 'react-chartjs-2';
const BarChart2 = (props) => {
	const options = {
		height: '34em',
		responsive: true,
		maintainAspectRatio: props.aspectRatio === undefined ? false : props.aspectRatio,
		title: {
			fontSize: props.TitleSize === undefined ? 15 : props.TitleSize,
			position: props.TitlePosition === undefined ? "bottom" : props.TitlePosition,
			display: false,
			text: props.title
		},
		legend: {
			display: true,
			labels: {
				boxWidth: props.labelwidth && true ? props.labelwidth : 20,
				fontSize: props.labelSize === undefined ? 12 : props.labelSize,
				padding: 8,

			},
			position: props.labelposition === undefined ? 'right' : props.labelposition,
			align: "start",
		},
		tooltips: {
			mode: 'label',
		},
		elements: {
			line: {
				fill: false
			}
		},
		scales: {
			xAxes: [{
				stacked: false,
				display: true,
				gridLines: {
					display: true,
				},
			}],
			yAxes: [{
				stacked: false,
				display: true,
				position: 'left',
				id: "y-axis-1",
				ticks: {

					display: true,
					beginAtZero: true,
					fontSize: 13,
					padding: 10,
					callback: function (tick, index, ticks) {
						return tick;
					}
				},
				gridLines: {
					display: false,
				},
				scaleLabel: {
					display: true,
					labelString: props.labelString === undefined ? '' : props.labelString,
					fontColor: props.fontColor === undefined ? '#546372' : props.fontColor,
					fontSize: props.fontSize === undefined ? 12 : props.fontSize,
					fontFamily: "Montserrat",
				},
			},
			]
		}

	};
	let data = null;
	if (props.isSuspense) {

		data = props.data.read().chart;

	} else {

		data = props.data;
	}

	return (
		<Bar
			data={data}
			options={options} />
	);
}
export default BarChart2;