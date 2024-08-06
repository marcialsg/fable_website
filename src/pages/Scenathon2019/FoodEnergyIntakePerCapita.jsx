import React, { useState, useEffect } from "react";
import MixedChart from "../../components/Scenathon2019/MixedChart.jsx";
import ComboBoxFoodEnergy from "../../components/ComboBox";

import FoodEnergyService from "../../services/Scenathon2019/FoodEnergyService";
import ConvertToCSV from "../../components/ConvertToCSV";
import FooterTxt from "../../components/FooterTxt"
//No se esta usando esta clase
const FoodEnergyIntakePerCapita = () => {
	const [state, setState] = useState({
		select: {
			Year: "2030",
			scenathon_id: "5",
			iteration: "2",
			ScenathonYear: "2019"
		},
	});

	const [json, setJson] = useState([
		{
			labels: [],
			datasets: [],
			CSV: [],
		},
	]);

	useEffect(() => {
		FoodEnergyService("Zerohunger", state).then(setJson);
	}, [state]);

	const DownloadCSV = (e) => {
		ConvertToCSV(json.CSV);
	};
	return (
		<div>
			<div className="contenedor-selects">
				
				<ComboBoxFoodEnergy  onClick={DownloadCSV} />
			</div>
			<div className="protected-graph-wrapper">
					<div>
						<div style={{ textAlign: "left", height: "35em", width: "65vw" }}>
							<MixedChart
								data={json}
								labelString="Kcal per capita per day"
								title=""
								chartHeight={'35em'}
							/>
							<FooterTxt txt={"Energy intake and Minimum Dietary Energy Requirement (MDER) in kilocalories per capita per day."} />
						</div>
					</div>
				</div>
		</div>
	);
};
export default FoodEnergyIntakePerCapita;
