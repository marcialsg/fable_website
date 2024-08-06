import React, { useState, useEffect } from "react";
import MixedChartZero from "../../components/Scenathon2021/MixedChartBig";
import ComboBox from "../../components/ComboBox";
import ComboBoxTradeAdjusment from "../../components/Scenathon2021/ComboBoxTradeAdjusment";
import ComboBoxPathway from "../../components/Scenathon2021/ComboBoxPathway";
import NetForestCoverService from "../../services/Scenathon2021/NetForestCoverService";
import ConvertToCSV from "../../components/ConvertToCSV";
import "../../css/index.css";
import scenathonIterationsLabels from "../../data/scenathon_iterations_labels.json";

const DrawNfch = (props) => {
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

  const [laoder, setLoader] = useState(false);
  const [state, setState] = useState({
    select: {
      GraficaType: "group",
      scenathon_id: props.year.scenathon_id,
      iteration: "1",
      ScenathonYear: props.year.year,
    },
  });

  const getScenathonId = function (selectedvalue) {
    console.log("GlobalTargets getScenathonId selectedvalue: ", selectedvalue);

    for (var i = 0; i < Object.keys(tradeAdjustments).length; i++) {
      const iterationsKey = Object.keys(tradeAdjustments)[i];
      console.log("GlobalTargets iterationsKey: ", iterationsKey);

      const itObject = tradeAdjustments[iterationsKey];
      console.log("GlobalTargets itObject: ", itObject);

      const itLabel = itObject.label;
      console.log("GlobalTargets itLabel: ", itLabel);

      if (itLabel === selectedvalue) {
        return "" + iterationsKey;
      }
    }
  };

  const [json, setJson] = useState([
    {
      labels: [],
      datasets: [],
      CSV: [],
      Pathways: [],
    },
  ]);

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

    NetForestCoverService(state).then(function (value) {
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

    console.log("NetForestCoverChange handleChange e.target: ", e.target);

    switch (e.target.name) {
      case "iteration":
        iteration = e.target.value;
        break;

      case "GraficaType":
        group = e.target.value;
        break;

      case "scenathon_id": //pathway
        scenathon = getScenathonId(e.target.value);
        iteration = Object.keys(tradeAdjustments[scenathon]["iterations"])[0];
        setTradeAdjustmentsOptions([]);

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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "35em",
        width: "65vw",
      }}
    >
      <MixedChartZero
        data={json}
        labelString="1000 ha Per 5 Years"
        title=" "
        chartHeight={"35em"}
      />
      <p className="gCaption">
        Forest loss due to crop, pasture, and/or urban expansion and forest gain
        due to afforestation in 1000 ha per 5-year periods (2005 corresponds to
        years 2001 to 2005). Source of historical data:
        <a
          href="https://datastudio.google.com/u/0/reporting/77705208-e149-4507-a419-63ddbef26a63/page/uBsMB"
          rel="noreferrer"
          target="_blank"
        >
          {" "}
          Global Forest Watch (GFW){" "}
        </a>
      </p>
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
        <ComboBox
          year={state.select.ScenathonYear}
          onChange={handleChange}
          onClick={DownloadCSV}
        />
      </div>
      <div className="graph-wrapper">
        {laoder ? (
          <div class="loader"></div>
        ) : json.length === 0 ? (
          <div>No values for the given input data</div>
        ) : (
          component
        )}
      </div>
    </div>
  );
};

export default DrawNfch;
