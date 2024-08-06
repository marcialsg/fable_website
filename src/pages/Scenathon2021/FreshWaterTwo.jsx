import FooterTxt from "../../components/FooterTxt";
import Spinner from "../../components/Spinner";
import BarChart3 from "../../components/Scenathon2021/BarChart3";
import React, { useEffect, useState, Suspense } from "react";
import FreshWaterTwoService from "../../services/Scenathon2021/FreshWaterTwoService";

import ComboBox from "../../components/ComboBox";
import ComboBoxPathway from "../../components/Scenathon2021/ComboBoxPathway";
import ComboBoxTradeAdjusment from "../../components/Scenathon2021/ComboBoxTradeAdjusment";
import ConvertToCSV from "../../components/ConvertToCSV";

import scenathonIterationsLabels from "../../data/scenathon_iterations_labels.json";

const DrawFreshWater2 = (props) => {
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
      // console.log("FreshWaterTwo iterationsKey: ", iterationsKey);

      const itObject = tradeAdjustments[iterationsKey];
      // console.log("FreshWaterTwo itObject: ", itObject);

      const itLabel = itObject.label;
      // console.log("FreshWaterTwo itLabel: ", itLabel);

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

  const [pathways, setPathways] = useState([]);
  const [tradeAdjustments, setTradeAdjustments] = useState([]);
  const [tradeAdjustmentsOptions, setTradeAdjustmentsOptions] = useState([]);
  const [chart, setChart] = useState([]);

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
        group = e.target.GraficaType;
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

  useEffect(() => {
    setLoader(true);
    // In means that the year has been changed
    if (state.select.ScenathonYear !== props.year.year) {
      state.select.scenathon_id = props.year.scenathon_id;
      state.select.ScenathonYear = props.year.year;
    }

    FreshWaterTwoService(state).then(function (value) {
      setJson(value);
      setChart(value.Chart);

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
      setLoader(false);
    });
  }, [state, props]);
  var component = (
    <div className="protected-graph-wrapper">
            <BarChart3
              data={chart}
              labelString="Blue water in cubic metres"
              chartHeight={"35em"}
            />
            <FooterTxt
              txt={
                "Fresh Water used for irrigation of crops and livestock production"
              }
            />
          </div>
      );

  return (
    <div>
      <Suspense fallback={<Spinner marginLeft={"100%"} />}>
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
            ) : chart.length === 0 ? (
              <div>No values for the given input data</div>
            ) : (
              component
            )}
        </div>
      </Suspense>
    </div>
  );
};

export default DrawFreshWater2;
