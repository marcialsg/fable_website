import React, { useState, useEffect, Suspense } from "react";
import Spinner from "../../components/Spinner";
import ConvertToCSV from "../../components/ConvertToCSV";
import ComboBoxPathway from "../../components/Scenathon2021/ComboBoxPathway";
import ComboBoxTradeAdjusment from "../../components/Scenathon2021/ComboBoxTradeAdjusment";
import ComboBox from "../../components/ComboBox";
import GreenHouseTwoService from "../../services/Scenathon2021/GreenHouseTwoService";
import FooterTxt from "../../components/FooterTxt";
import BarchartSuspense from "../../components/Scenathon2021/BarchartSuspense";
import scenathonIterationsLabels from "../../data/scenathon_iterations_labels.json";
import BarChart3 from "../../components/Scenathon2021/BarChart3";

//nfch=GreenHouse2
const GreenHouse = (props) => {
  const getIterationsLabels = (iterations, scenathonId) => {
    const iterationsOptions =
      scenathonIterationsLabels[state.select.ScenathonYear]["scenathon_id"][
        scenathonId
      ]["iteration"];

    var iterationsLabels = [];

    iterations.forEach((element) => {
      for (const [key, value] of Object.entries(iterationsOptions)) {
        if (Number(element) === Number(key)) {
          iterationsLabels.push(<option value={key}>{value}</option>);
        }
      }
    });

    return iterationsLabels;
  };

  const getScenathonId = function (scenathon_label) {
    console.log(
      "GreenHouse2 getScenathonId scenathon_label: ",
      scenathon_label
    );

    for (var i = 0; i < Object.keys(tradeAdjustments).length; i++) {
      const iterationsKey = Object.keys(tradeAdjustments)[i];
      console.log("GreenHouse2 iterationsKey: ", iterationsKey);

      const itObject = tradeAdjustments[iterationsKey];
      console.log("GreenHouse2 itObject: ", itObject);

      const itLabel = itObject.label;
      console.log("GreenHouse2 itLabel: ", itLabel);

      if (itLabel === scenathon_label) {
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

  const [json, setJson] = useState({
    chartOne: {},
    charTwo: {},
    CSV: [],
    Pathways: [],
  });

  const [pathways, setPathways] = useState([]);
  const [tradeAdjustments, setTradeAdjustments] = useState([]);
  const [tradeAdjustmentsOptions, setTradeAdjustmentsOptions] = useState([]);

  useEffect(() => {
    setLoader(true);
    // In means that the year has been changed
    if (state.select.ScenathonYear !== props.year.year) {
      state.select.scenathon_id = props.year.scenathon_id;
      state.select.ScenathonYear = props.year.year;
    }

    GreenHouseTwoService(state).then(function (value) {
      console.log("GreenHouseTwoService value: \n", value);
      setJson(value);

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

      const iterationsLabels = getIterationsLabels(
        Object.keys(
          value.TradeAdjustments[state.select.scenathon_id]["iterations"]
        ),
        state.select.scenathon_id
      );
      setTradeAdjustmentsOptions(iterationsLabels);
      setLoader(false);
    });
  }, [state, props]);

  const handleChange = async (e) => {
    var group = state.select.GraficaType;
    var scenathon = state.select.scenathon_id;
    var iteration = state.select.iteration;
    var scenathonYear = state.select.ScenathonYear;

    switch (e.target.name) {
      case "GraficaType":
        group = e.target.value;
        break;

      case "scenathon_id": //pathway
        scenathon = getScenathonId(e.target.value);
        iteration = Object.keys(tradeAdjustments[scenathon]["iterations"])[0];
        setTradeAdjustmentsOptions([]);
        break;

      case "iteration":
        iteration = e.target.value;
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

  const DownloadCSV = (e) => {
    ConvertToCSV(json.CSV);
  };

  var component = (
    <div className="graph">
      {props.section ? (
        <div className="protected-graph-wrapper">
          <BarChart3
            data={json.chartOne}
            labelString="Gt CO2e"
            chartHeight={"35em"}
          />
          <FooterTxt
            txt={
              "Annual GHG emissions from crops and livestock in Gt CO2e by country."
            }
          />
        </div>
      ) : (
        <div className="protected-graph-wrapper">
          <BarChart3
            data={json.charTwo}
            labelString="Gt CO2e"
            chartHeight={"35em"}
          />
          <FooterTxt
            txt={
              "Average annual GHG emissions from land use change and peat oxidation in Gt CO2e by country."
            }
          />
        </div>
      )}
    </div>
  );

  return (
    <div>
      <div className="contenedor-selects">
        {/* <ComboBoxYear onChange={handleChange} /> */}
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
        ) : json.chartOne.length === 0 && json.charTwo.length === 0 ? (
          <div>No values for the given input data</div>
        ) : (
          component
        )}
    </div>
  );
};

export default GreenHouse;
