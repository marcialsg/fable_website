import React, { useState, useEffect } from "react";
import MixedChartBig from "../../components/Scenathon2021/MixedChartBig";
import ComboBoxFoodEnergy from "../../components/ComboBox";
import ComboBoxPathway from "../../components/Scenathon2021/ComboBoxPathway.jsx";
import FoodEnergyService from "../../services/Scenathon2021/FoodEnergyService";
import ConvertToCSV from "../../components/ConvertToCSV";
import ComboBoxTradeAdjusment from "../../components/Scenathon2021/ComboBoxTradeAdjusment";
import FooterTxt from "../../components/FooterTxt";
import scenathonIterationsLabels from '../../data/scenathon_iterations_labels.json';

//No se esta usando esta clase
const FoodEnergyIntakePerCapita = (props) => {


  const getIterationsLabels = (iterations, scenathonId) => {

		const iterationsOptions = scenathonIterationsLabels[state.select.ScenathonYear]["scenathon_id"][scenathonId]["iteration"];

		var iterationsLabels = [] 

		iterations.forEach(element => {
			for (const [key, value] of Object.entries(iterationsOptions)) {

				if (Number(element) === Number(key)) {

					iterationsLabels.push(<option value={key}>{value}</option>);
				}
			}
		});
    
    return iterationsLabels;
	}

  const getScenathonId = function (scenathon_label) {
    //console.log(
    //   "FoodEnergyIntakePerCapita getScenathonId scenathon_label: ",
    //   scenathon_label
    // );

    for (var i = 0; i < Object.keys(tradeAdjustments).length; i++) {
      const iterationsKey = Object.keys(tradeAdjustments)[i];
      // console.log("FoodEnergyIntakePerCapita iterationsKey: ", iterationsKey);

      const itObject = tradeAdjustments[iterationsKey];
      // console.log("FoodEnergyIntakePerCapita itObject: ", itObject);

      const itLabel = itObject.label;
      //console.log("FoodEnergyIntakePerCapita itLabel: ", itLabel);

      if (itLabel === scenathon_label) {
        return "" + iterationsKey;
      }
    }
  };
  const [laoder, setLoader] = useState(false);
  const [state, setState] = useState({
    select: {
      Year: "2030",
      GraficaType: "group",
      scenathon_id: props.year.scenathon_id,
      iteration: "1",
      ScenathonYear: props.year.year,
    },
  });

  const [json, setJson] = useState({
    labels: [],
    datasets: [],
    CSV: [],
    Pathways: [],
  });

  const [pathways, setPathways] = useState([]);
  const [tradeAdjustments, setTradeAdjustments] = useState([]);
  const [tradeAdjustmentsOptions, setTradeAdjustmentsOptions] = useState([]);
  
  useEffect(() => {
    // In means that the year has been changed
    setLoader(true);
    if (state.select.ScenathonYear !== props.year.year) {
      state.select.scenathon_id = props.year.scenathon_id;
      state.select.ScenathonYear = props.year.year;
    }

    FoodEnergyService("Zerohunger", state).then(function (value) {
      setJson(value);

      // console.log("FoodEnergyService TradeAdjustments: \n", JSON.stringify(value.TradeAdjustments));
      // console.log('FoodEnergyService state.select: ', JSON.stringify(state.select));

      const pathwayOptions = [];
      for (var i = 0; i < Object.keys(value.TradeAdjustments).length; i++) {
        const iterationsKey = Object.keys(value.TradeAdjustments)[i];
        const iterationsValue = value.TradeAdjustments[iterationsKey];
        // console.log("FoodEnergyService iterationsKey: ", iterationsKey);
        // console.log("FoodEnergyService iterationsValue: \n", iterationsValue);

        pathwayOptions.push(iterationsValue.label);
        
      }

      setPathways(pathwayOptions);
      setTradeAdjustments(value.TradeAdjustments);
      
      const iterationsLabels = getIterationsLabels(Object.keys(value.TradeAdjustments[state.select.scenathon_id]["iterations"]), state.select.scenathon_id);
      setTradeAdjustmentsOptions(iterationsLabels);

      setLoader(false);
    });

    console.log("FoodEnergyIntakePerCapita json: \n", json);
    
  }, [state, props]);

  const handleChange = async (e) => {
    var year = state.select.Year;
    var scenathon = state.select.scenathon_id;
    var iteration = state.select.iteration;
    var scenathonYear = state.select.ScenathonYear;

    switch (e.target.name) {
      case "Year":
        year = e.target.Year;
        break;

      case "scenathon_id": //pathway
        scenathon = getScenathonId(e.target.value);
        iteration = Object.keys(tradeAdjustments[scenathon]["iterations"])[0];
        setTradeAdjustmentsOptions([])
        break;

      case "iteration":
        iteration = e.target.value;
        break;

    }

    setState({
      select: {
        scenathon_id: scenathon,
        iteration: iteration,
        ScenathonYear: scenathonYear,
        Year: year,
      },
    });
  };

  const DownloadCSV = (e) => {
    ConvertToCSV(json.CSV);
  };

  var component = (
<div style={{ textAlign: "left", height: "35em", width: "65vw" }}>
              <MixedChartBig
                data={json}
                labelString="Kcal per capita per day"
                title=""
                chartHeight={"35em"}
              />
              <FooterTxt
                txt={
                  "Energy intake and Minimum Dietary Energy Requirement (MDER) in kilocalories per capita per day."
                }
              />
            </div>
  );
  return (
    <div>
      <div className="contenedor-selects">
        

        <ComboBoxPathway onChange={handleChange} data={pathways} />
        <ComboBoxTradeAdjusment
          data={tradeAdjustmentsOptions}
          onChange={handleChange}
        />
        <ComboBoxFoodEnergy onChange={handleChange} onClick={DownloadCSV} />
      </div>
      <div
        className="graph"
        style={{
          display: "flex",
          flexDirection: "column",
          height: "35em",
          width: "65vw",
        }}>
        <div className="graph-wrapper">
        {laoder ? (
              <div class="loader"></div>
            ) : json.datasets.length === 0 ? (
              <div>No values for the given input data</div>
            ) : (
              component
            )}
        </div>
      </div>
    </div>
  );
};
export default FoodEnergyIntakePerCapita;
