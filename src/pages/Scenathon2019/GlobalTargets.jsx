import React, { useState, useEffect } from "react";
import "../../css/index.css";
import "../../../node_modules/react-grid-layout/css/styles.css";
import "../../../node_modules/react-resizable/css/styles.css";
import * as ReactBootStrap from "react-bootstrap";
import MixedChart from "../../components/Scenathon2019/MixedChartGlo";
import MixedChart2 from "../../components/Scenathon2019/MixedChart2";
import ComboBox from '../../components/ComboBox';
import FoodEnergyService from "../../services/Scenathon2019/FoodEnergyService";
import NetForestCoverService from "../../services/Scenathon2019/NetForestCoverService";
import BiodiversitySer from "../../services/Scenathon2019/BiodiversityService";
import GreenHouseService from '../../services/Scenathon2019/GreenHouseService';
import SuperGraph from "../../components/Scenathon2019/SuperGraph";
import ConvertToCSV from '../../components/ConvertToCSV';
import ComboBoxYear from "../../components/ComboBoxYear";
//const ResponsiveReactGridLayout = WidthProvider(Responsive);

const DrawGlobalTargets = (props) => {

	const [state, setState] = React.useState({
		select: {
			GraficaType: "group",
			scenathon_id: "5",
			iteration: "2",
			Year: "2030",
			ScenathonYear: "2019"
		}
	});

	const [stadt, setStadt] = React.useState({ section: true })
	const [targetOne, seTargetOne] = useState({ labels: [], datasets: [], CSV: [] });
	const [targetTwo, seTargetTwo] = useState({ labels: [], datasets: [], CSV2: [] });
	const [GrenHouseTarget, setGrenHouseTarget] = useState({
		chartOne: [],
		charTwo: [],
	});
	const [targetFive, seTargetFive] = useState({ labels: [], datasets: [] });

	useEffect(() => {
		NetForestCoverService("wNetForesCoverChange", state).then(function (value) {
			seTargetOne(value);
		});

		BiodiversitySer("biodiversityByCountry", state).then(function (value) {
			seTargetTwo(value);
		});

		GreenHouseService("GlobalghgEtarget", state).then(function (value) {
			setGrenHouseTarget(value);
		});

		FoodEnergyService("Zerohunger", state).then(function (value) {
			seTargetFive(value);
		});

	}, [state]);

	const DownloadCSV = e => {

		console.log('GLOBAL TARGETS: DownloadCSV: target: ', targetOne.CSV);
		ConvertToCSV(targetOne.CSV)
	}

	const handleChange = (e) => {
		var group = state.select.GraficaType;
		var scenathon = state.select.scenathon_id;
		var iteration = state.select.iteration;
		var scenathonYear = state.select.ScenathonYear;
		var year = state.select.Year;

		switch (e.target.name) {
			case "GraficaType":
				group = e.target.value;
				break;
		}

		setState({
			select: {
				GraficaType: group,
				scenathon_id: scenathon,
				iteration: iteration,
				Year: year,
				ScenathonYear: scenathonYear
			}
		});
	}

	return (
		<div class="prueba2">
			<div className="contenedor-selects">
				
				{/* <ComboBoxYear defaultValue='2019' onChange={handleChange} /> */}
				<ComboBox onChange={handleChange} onClick={DownloadCSV} />
			</div>
			<div class="containerGraphs">
				<div class="cajaGraphs">
					<MixedChart
						TitleSize={14}
						data={targetOne}
						title="Net Forest Cover Change"
						labelString="ha/5 years period"
						barWidth={0.3}
						chartWidth={'200em'}
						chartHeight={'200em'}
					/>
				</div>
				<div class="cajaGraphs">
					<MixedChart2
						TitleSize={14}
						data={targetTwo}
						labelString="% of total land"
						title="Biodiversity"
						barWidth={0.3}
						chartHeight={'20em'}
						chartWidth={'20em'}
					/>
				</div>
				<div class="cajaGraphs">
					<SuperGraph
						TitleSize={14}
						data={GrenHouseTarget.chartOne}
						labelString="Gt CO2e"
						title="Greenhouse Gas (GHG) Emissions"
						barWidth={0.3}
						displayTitle={true}
						chartHeight={'20em'}
						chartWidth={'20em'}
					/>
				</div>


				<div class="cajaGraphs">
					<SuperGraph
						TitleSize={14}
						data={GrenHouseTarget.charTwo}
						labelString="Gt CO2e"
						title="Greenhouse Gas (GHG) Emissions"
						barWidth={0.3}
						displayTitle={true}
						chartHeight={'20em'}
						chartWidth={'20em'}
					/>
				</div>
				<div class="cajaGraphs">
					<MixedChart
						TitleSize={14}
						data={targetFive}
						labelString='Kcal per capita per day'
						title="Zero Hunger"
						barWidth={0.8}
						chartHeight={'20em'}
						chartWidth={'20em'}
					/>
				</div>
			</div>
		</div>
	);
};
export default DrawGlobalTargets;