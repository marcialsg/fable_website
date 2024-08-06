import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart3 = (props) => {

	const options = {
		
		responsive: true,
		maintainAspectRatio: props.aspectRatio === undefined ? false : props.aspectRatio,
		title: {
			/* display: true, */
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
			position: props.labelposition === undefined ? 'right' : props.labelposition,
			align: 'start',

		},
		tooltips: {
			mode: 'index',
			intersect: true,
			padding:0,
			bodySpacing:1,
			position: 'nearest',
			callbacks: {
				label: function (tooltipItem, data) {
					var label = data.datasets[tooltipItem.datasetIndex].label || '';

					return label = label + " " + tooltipItem.yLabel + "%"
				}
			}
		},
		layout:{
			padding:{
				bottom:0,
			}
		},
		hover: {
			mode: 'index',
			intersect: false,
			animationDuration: 1000
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
						fontSize: props.fontSize === undefined ? 12 : props.fontSize,
						fontFamily: "Montserrat",
					},
					ticks: {
						callback: function (label, index, labels) {
							return label + '%';
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

		
		<div style={{display:"flex", height:props.chartHeight||'20em',width:props.chartWidth||'65vw'}}>
    		<div className="string-label">{props.labelString}</div>
    		<Bar
				data={props.data}
				options={options} />
		</div>

	);
}


export default BarChart3;