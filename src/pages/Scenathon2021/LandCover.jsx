import React, { useState, useEffect, Suspense } from "react";
import Spinner from "../../components/Spinner";

import BarChartBig from "../../components/BarChartBig";
import ComboBox from "../../components/ComboBox";
import ComboBoxPathway from "../../components/Scenathon2021/ComboBoxPathway";
import LandCoverService from "../../services/Scenathon2021/LandCoverService";
import ConvertToCSV from "../../components/ConvertToCSV";
import ComboBoxTradeAdjusment from "../../components/Scenathon2021/ComboBoxTradeAdjusment";
import scenathonIterationsLabels from "../../data/scenathon_iterations_labels.json";

const DrawLandCover = (props) => {
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
    for (var i = 0; i < Object.keys(tradeAdjustments).length; i++) {
      const iterationsKey = Object.keys(tradeAdjustments)[i];
      const itObject = tradeAdjustments[iterationsKey];
      const itLabel = itObject.label;

      if (itLabel === scenathon_label) {
        return "" + iterationsKey;
      }
    }
  };

  const [pathways, setPathways] = useState([]);
  const [tradeAdjustments, setTradeAdjustments] = useState([]);
  const [tradeAdjustmentsOptions, setTradeAdjustmentsOptions] = useState([]);

  var [state, setState] = useState({
    select: {
      GraficaType: "group",
      scenathon_id: props.year.scenathon_id,
      iteration: "1",
      ScenathonYear: props.year.year,
    },
  });

  useEffect(() => {
    // In means that the year has been changed
    if (state.select.ScenathonYear !== props.year.year) {
      state.select.scenathon_id = props.year.scenathon_id;
      state.select.ScenathonYear = props.year.year;
    }

    LandCoverService(state).then(function (value) {
      setJson(value);

      const pathwayOptions = [];
      for (var i = 0; i < Object.keys(value.TradeAdjustments).length; i++) {
        const iterationsKey = Object.keys(value.TradeAdjustments)[i];
        const iterationsValue = value.TradeAdjustments[iterationsKey];

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
    });
  }, [state, props]);

  const [json, setJson] = useState([
    {
      Chart: [],
      CSV: [],
      Pathways: [],
    },
  ]);

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

  return (
    <div>
      <Suspense fallback={<Spinner />}>
        <div>
          <div className="contenedor-selects">
            {/* <ComboBoxYear onChange={handleChange} /> */}
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
          <div className="protected-graph-wrapper">
            <BarChartBig
              data={json.Chart}
              title=""
              labelString="1000 ha per year"
              chartHeight={"35em"}
            />
          </div>
        </div>
      </Suspense>
    </div>
  );
};

export default DrawLandCover;
