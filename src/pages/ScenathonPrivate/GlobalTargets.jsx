import React, { useState, useEffect } from "react";
import "../../css/index.css";
import "../../../node_modules/react-grid-layout/css/styles.css";
import "../../../node_modules/react-resizable/css/styles.css";
import * as ReactBootStrap from "react-bootstrap";
import MixedChart from "../../components/ScenathonPrivate/MixedChart";
import MixedChartZero from "../../components/ScenathonPrivate/MixedChartBig";
import MixedChart2 from "../../components/ScenathonPrivate/MixedChart2";
import BarChart from "../../components/BarChart";
import ComboBoxTradeAdjusment from "../../components/ScenathonPrivate/ComboBoxTradeAdjusment";
import ComboBoxPathway from "../../components/ScenathonPrivate/ComboBoxPathway";
import ComboBoxCountrySelection from "../../components/ScenathonPrivate/ComboBoxCountrySelection";
import FooterTxt from "../../components/FooterTxt";
import GlobalTargetService from "../../services/ScenathonPrivate/GlobalTargetService";
import GreenHouseTarget from "../../services/ScenathonPrivate/GreenHouseTarget";
import FoodSecurityService from "../../services/ScenathonPrivate/FoodSecurityService";

const DrawGlobalTargets = (props) => {
  // console.log("DrawGlobalTargets props", props);

  const getTradeAdjusments = function ({ iterations }) {
    const tradeAdjustmentsList = [];

    // console.log("GlobalTargets getTradeAdjusments: ", iterations);

    for (var i = 0; i < Object.keys(iterations).length; i++) {
      const iterationsLabel = Object.keys(iterations)[i];
 
      tradeAdjustmentsList.push(iterationsLabel);
    }

    // console.log("GlobalTargets getTradeAdjusments: ", tradeAdjustmentsList);

    return tradeAdjustmentsList;
  };

  const getScenathonId = function (selectedvalue) {
    // console.log("GlobalTargets getScenathonId selectedvalue: ", selectedvalue);

    for (var i = 0; i < Object.keys(tradeAdjustments).length; i++) {
      const iterationsKey = Object.keys(tradeAdjustments)[i];
      // console.log("GlobalTargets iterationsKey: ", iterationsKey);

      const itObject = tradeAdjustments[iterationsKey];
      // console.log("GlobalTargets itObject: ", itObject);

      const itLabel = itObject.label;
      // console.log("GlobalTargets itLabel: ", itLabel);

      if (itLabel === selectedvalue) {
        return "" + iterationsKey;
      }
    }
  };

  const [state, setState] = useState({
    select: {
      GraficaType: "group",
      scenathon_id: props.year.scenathon_id,
      iteration: "1",
      ScenathonYear: props.year.year,
      country: ""
    },
  });



  useEffect(() => {

    // In means that the year has been changed
    if (state.select.ScenathonYear !== props.year.year) {
      state.select.scenathon_id = props.year.scenathon_id;
      state.select.ScenathonYear = props.year.year;
    }

    GlobalTargetService(state).then((value) => {

      // console.log("GlobalTargets useEffect: ", value);
      // console.log("Countries: ", value.Countries);
      const countryOptions =["World"];

      value.Countries.forEach((element) => {
        countryOptions.push(element);
      })

      setCountries(countryOptions); 
      seTargetOne(value.targetOne);
      seTargetTwo(value.targetTwo);
      seTargetThree(value.targetThree);
      setPathways(value.Pathways);
      setTradeAdjustments(value.TradeAdjustments);
      
      const tradeAdjustmentsList = getTradeAdjusments(value.TradeAdjustments[state.select.scenathon_id])
      setTradeAdjustmentsOptions(
        tradeAdjustmentsList
      )


    });
    GreenHouseTarget(state).then((value) => {
      seTargetFour(value.targetFour);
      seTargetFourTwo(value.targetFourCharTwo);
      seTargetSix(value.targetSix);
      setPathways(value.Pathways);
      setTradeAdjustments(value.TradeAdjustments);
      setTradeAdjustmentsOptions(
        getTradeAdjusments(value.TradeAdjustments[state.select.scenathon_id])
      );
    });
    FoodSecurityService(state).then((value) => {
      seTargetFive(value);
      setPathways(value.Pathways);
      setTradeAdjustments(value.TradeAdjustments);
      setTradeAdjustmentsOptions(
        getTradeAdjusments(value.TradeAdjustments[state.select.scenathon_id])
      );
    });
  }, [state, props]);

  const [taDefaultValue, setTaDefaultValue] = useState("1");

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

  const [countries, setCountries] = useState([]);

  const [tradeAdjustments, setTradeAdjustments] = useState([]);
  const [tradeAdjustmentsOptions, setTradeAdjustmentsOptions] = useState([]);

  // useEffect(() => {setTaDefaultValue(tradeAdjustmentsOptions[0]);}, [tradeAdjustmentsOptions]);


  const handleChange = async (e) => {
    var group = state.select.GraficaType;
    var scenathon = state.select.scenathon_id;
    var iteration = state.select.iteration;
    var scenathonYear = state.select.ScenathonYear;
    var country = state.select.country;

    // console.log("GLOBAL TARGETS: handleChange: target: ", e.target);
    // console.log("GLOBAL TARGETS: handleChange: target name: ", e.target.name);

    // console.log("GLOBAL TARGETS: handleChange: target value: ", e.target.value);

    switch (e.target.name) {
      case "country_selection":

      country = e.target.value;

        if (country  == "World"){
          country = ""
        }
        
        break;

      case "iteration": //before or after

        iteration = e.target.value;
        country = ""
        setCountries([])

        break;

      case "GraficaType":
        group = e.target.value;
        break;

      case "scenathon_id": //pathway
        scenathon = getScenathonId(e.target.value);

        break;
    }

    setState({
      select: {
        GraficaType: group,
        scenathon_id: scenathon,
        iteration: iteration,
        ScenathonYear: scenathonYear,
        country: country
      },
    });
  };

  return (
    <div class="prueba2">
      <div className="contenedor-selects">

        <ComboBoxCountrySelection data={countries} onChange={handleChange} />
        <ComboBoxPathway data={pathways} onChange={handleChange} />
        <ComboBoxTradeAdjusment
          data={tradeAdjustmentsOptions}
          onChange={handleChange}
          default={taDefaultValue}
        />
        
      </div>

      <div className="containerGraphs">
        {props.section ? (
          <>
            <div class="cajaGraphs">
              <MixedChart2
                TitleSize={14}
                data={targetThree}
                title="Target 1: A mininum share of earth's terrestrial land supports biodiversity conservation"
                chartWidth={"20vw"}
                chartHeight={"20em"}
              />
            </div>
            <div class="cajaGraphs">
              <MixedChart2
                TitleSize={14}
                data={targetTwo}
                title="Target 2: A minimum share of Earth's terrestrial land is within protected areas"
                chartHeight={"20em"}
                chartWidth={"20vw"}
              />
            </div>
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
    </div>
  );
};
export default DrawGlobalTargets;
