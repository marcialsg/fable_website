import React from 'react';
import { Bar } from 'react-chartjs-2';

const drawMixedChart2 = (props) => {

	const options = {
		responsive: true,
		maintainAspectRatio: props.aspectRatio === undefined ? false : props.aspectRatio,
		title: {
			display: false,
			fontSize: props.TitleSize === undefined ? 15 : props.TitleSize,
			position: props.TitlePosition === undefined ? "bottom" : props.TitlePosition,
			text: props.title
		},
		legend: {
			display: true,
			labels: {
				boxWidth: props.labelwidth === undefined ? 20 : props.labelwidth,
				fontSize: props.labelSize === undefined ? 18 : props.labelSize,
				padding: 8,
			},
			position: props.labelposition === undefined ? 'right' : props.labelposition,
			align: "start",
		},
		tooltips: {
			mode: 'label',
			callbacks: {
				label: function (tooltipItem, data) { return (tooltipItem.yLabel * 100).toFixed(2) + '%'; }
			},
		},
		elements: {
			line: {
				fill: false,
				tension: 0,
				bezierCurve: false
			}
		},
		scales: {
			xAxes: [{
				stacked: true,
				display: true,
				gridLines: {
					display: true
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

						return (label * 100).toFixed(1) + '%';
					},
					min: 0,
					fontColor: props.fontColor === undefined ? '#546372' : props.fontColor,
					fontSize: props.fontSize === undefined ? 18 : props.fontSize
				},

				labels: {
					show: true
				}

			}, {
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
			}]
		}
	};

	return (
		<div style={{display:"flex", height:props.chartHeight||'20em',width:props.chartWidth||'65vw', flexDirection: 'column'}}>
			<div style={{display:"flex", height:props.chartHeight,width:'100%'}}>
				<Bar data={props.data} options={options} />
			</div>
			<div className="string-title" style={{maxHeight:'10%', fontSize:'12px',fontWeight:'bold'}}>{props.title||<></>}</div>
		</div>
	);
}
export default drawMixedChart2;