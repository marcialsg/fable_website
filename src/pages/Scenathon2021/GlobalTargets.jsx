import React, { useState, useEffect } from "react";
import "../../css/index.css";
import "../../../node_modules/react-grid-layout/css/styles.css";
import "../../../node_modules/react-resizable/css/styles.css";
import MixedChart from "../../components/Scenathon2021/MixedChart";
import MixedChartZero from "../../components/Scenathon2021/MixedChartBig";
import MixedChart2 from "../../components/Scenathon2021/MixedChart2";
import BarChart from "../../components/BarChart";
import ComboBox from "../../components/ComboBox";
import ComboBoxTradeAdjusment from "../../components/Scenathon2021/ComboBoxTradeAdjusment";
import ComboBoxPathway from "../../components/Scenathon2021/ComboBoxPathway";
import GlobalTargetService from "../../services/Scenathon2021/GlobalTargetService";
import GreenHouseTarget from "../../services/Scenathon2021/GreenHouseTarget";
import FoodSecurityService from "../../services/Scenathon2021/FoodSecurityService";
import ConvertToCSV from "../../components/ConvertToCSV";
import scenathonIterationsLabels from '../../data/scenathon_iterations_labels.json';
import FooterTxt from "../../components/FooterTxt";

const DrawGlobalTargets = (props) => {
  

  
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

  const getScenathonId = function (selectedvalue) {


    for (var i = 0; i < Object.keys(tradeAdjustments).length; i++) {
      const iterationsKey = Object.keys(tradeAdjustments)[i];
      const itObject = tradeAdjustments[iterationsKey];
      const itLabel = itObject.label;

      if (itLabel === selectedvalue) {
        return "" + iterationsKey;
      }
    }
  };

  const [laoder, setLoader] = useState(false);
  const [state, setState] = useState({
    select: {
      GraficaType: "group",
      scenathon_id: props.year.scenathon_id,
      iteration: "1",
      ScenathonYear: props.year.year,
    },
  });

  useEffect(() => {
    // In means that the year has been changed
    setLoader(true);
    if (state.select.ScenathonYear !== props.year.year) {
      state.select.scenathon_id = props.year.scenathon_id;
      state.select.ScenathonYear = props.year.year;
    }

    GlobalTargetService(state).then((value) => {

      seTargetOne(value.targetOne);
      seTargetTwo(value.targetTwo);
      seTargetThree(value.targetThree);

    });

    GreenHouseTarget(state).then((value) => {

      seTargetFour(value.targetFour);
      seTargetFourTwo(value.targetFourCharTwo);
      seTargetSix(value.targetSix);

    });

    FoodSecurityService(state).then((value) => {
      

      seTargetFive(value);


      // console.log("FoodSecurityService TradeAdjustments: \n", JSON.stringify(value.TradeAdjustments));
      // console.log('FoodSecurityService state.select: ', JSON.stringify(state.select));

      const pathwayOptions = [];
      for (var i = 0; i < Object.keys(value.TradeAdjustments).length; i++) {
        const iterationsKey = Object.keys(value.TradeAdjustments)[i];
        const iterationsValue = value.TradeAdjustments[iterationsKey];
        // console.log("FoodSecurityService iterationsKey: ", iterationsKey);
        // console.log("FoodSecurityService iterationsValue: \n", iterationsValue);

        pathwayOptions.push(iterationsValue.label);
        
      }

      setPathways(pathwayOptions);
      setTradeAdjustments(value.TradeAdjustments);

      const iterationsLabels = getIterationsLabels(Object.keys(value.TradeAdjustments[state.select.scenathon_id]["iterations"]), state.select.scenathon_id);
      setTradeAdjustmentsOptions(iterationsLabels);
      setLoader(false);
    });
  }, [state, props]);

  const [targetOne, seTargetOne] = useState({
    labels: [],
    datasets: [],
    CSV: [],
  });
  const [targetTwo, seTargetTwo] = useState({
    labels: [],
    datasets: [],
    CSV2: [],
  });
  const [targetThree, seTargetThree] = useState({
    labels: [],
    datasets: [],
    CSV: [],
  });
  const [targetFour, seTargetFour] = useState({
    labels: [],
    datasets: [],
    CSV: [],
  });
  const [targetFourCharTwo, seTargetFourTwo] = useState({
    labels: [],
    datasets: [],
  });
  const [targetSix, seTargetSix] = useState({ labels: [], datasets: [] });
  const [targetFive, seTargetFive] = useState({ labels: [], datasets: [] });
  const [pathways, setPathways] = useState([]);

  const [tradeAdjustments, setTradeAdjustments] = useState([]);
  const [tradeAdjustmentsOptions, setTradeAdjustmentsOptions] = useState([]);

  const DownloadCSV = (e) => {
    console.log("GLOBAL TARGETS: DownloadCSV: target: ", targetOne.CSV);

    ConvertToCSV(targetOne.CSV);
  };

  const handleChange = async (e) => {
    var group = state.select.GraficaType;
    var scenathon = state.select.scenathon_id;
    var iteration = state.select.iteration;
    var scenathonYear = state.select.ScenathonYear;

    // console.log("GLOBAL TARGETS: handleChange: target: ", e.target);
    // console.log("GLOBAL TARGETS: handleChange: target name: ", e.target.name);

    // console.log("GLOBAL TARGETS: handleChange: target value: ", e.target.value);

    switch (e.target.name) {
      case "iteration": //before or after
        iteration = e.target.value;

        break;

      case "GraficaType":
        group = e.target.value;
        break;

      case "scenathon_id": //pathway

        scenathon = getScenathonId(e.target.value);
        iteration = Object.keys(tradeAdjustments[scenathon]["iterations"])[0];
        setTradeAdjustmentsOptions([])
        break;
    }

    setState({
      select: {
        GraficaType: group,
        scenathon_id: scenathon,
        iteration: iteration,
        ScenathonYear: scenathonYear,
      },
    });
  };

  var component = (
    <div className="containerGraphs">
        {props.section ? (
          <>
            <div class="cajaGraphs">
              <MixedChart2
                TitleSize={4}
                data={targetThree}
                title="Target 1: A mininum share of earth's terrestrial land supports biodiversity conservation"
                labelString="% of total land"
                barWidth={0.3}
                chartHeight={"20em"}
                chartWidth={"20vw"}
              />
            </div>
            {state.select.ScenathonYear !== "2020" ? (
            <div class="cajaGraphs">
              <MixedChart2
                TitleSize={14}
                data={targetTwo}
                title="Target 2: A minimum share of Earth's terrestrial land is within protected areas"
                labelString="% of total land"
                barWidth={0.3}
                chartHeight={"20em"}
                chartWidth={"20vw"}
              />
            </div>
            ): null}
            <div class="cajaGraphs">
              <MixedChart
                TitleSize={14}
                data={targetOne}
                title="Target 3: Zero net deforestation"
                labelString="1000h/year"
                chartHeight={"20em"}
                chartWidth={"20vw"}
              />
            </div>
            <div class="cajaGraphs">
              <BarChart
                TitleSize={14}
                data={targetFour}
                title="Target 4: Greenhouse gas emissions from crops and livestock"
                labelString="GtCo2"
                barWidth={0.3}
                displayTitle={true}
                chartHeight={"20em"}
                chartWidth={"20vw"}
              />
            </div>
            <div class="cajaGraphs">
              <MixedChart
                TitleSize={14}
                data={targetFourCharTwo}
                title="Target 5: Greenhouse gas emissions and removals from Land-Use, Land-Use-Changes, and Forestry (LULUCF)"
                labelString="GtCo2"
                barWidth={0.3}
                chartHeight={"20em"}
                chartWidth={"20vw"}
              />
            </div>
            <div class="cajaGraphs">
              <MixedChart
                TitleSize={14}
                data={targetSix}
                title="Target 6: Water use in agriculture"
                labelString="m³"
                barWidth={0.3}
                chartHeight={"20em"}
                chartWidth={"20vw"}
              />
            </div>
          </>
        ) : (
          <>
            <MixedChartZero
              data={targetFive}
              labelString="Kcal per capita per day"
              title="Target 7: Zero Hunger"
              chartHeight={"30em"}
              chartWidth={"65vw"}
            />
            <FooterTxt
                txt={
                  "Average daily energy intake per capita higher than the minimum requirement in all countries by 2030."
                }
              />
          </>
        )}
      </div>
  );

  return (
    <div class="prueba2">
      <div className="contenedor-selects">
        <ComboBoxPathway data={pathways} onChange={handleChange} />
        <ComboBoxTradeAdjusment
          data={tradeAdjustmentsOptions}
          onChange={handleChange}
        />
        <ComboBox
          year={state.select.ScenathonYear}
          onChange={handleChange}
          onClick={DownloadCSV}
        />
      </div>

      {laoder ? (
              <div class="loader"></div>
            ) : targetThree.length === 0 || targetTwo.length === 0 || targetOne.length === 0 || targetFour.length === 0 || targetFourCharTwo.length === 0 || targetSix.length === 0 || targetFive.length === 0 ? (
              <div>No values for the given input data</div>
            ) : (
              component
            )}

    </div>
  );
};
export default DrawGlobalTargets;
