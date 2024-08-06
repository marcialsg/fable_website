import React, { useState, useEffect, Suspense } from "react";
import "../../../node_modules/react-grid-layout/css/styles.css";
import "../../../node_modules/react-resizable/css/styles.css";
import FooterTxt from "../../components/FooterTxt";
import ComboBoxPathway from "../../components/Scenathon2021/ComboBoxPathway";
import ComboBoxYear from "../../components/ComboBoxYear";
import ComboBoxTradeAdjusment from "../../components/Scenathon2021/ComboBoxTradeAdjusment";
import Spinner from "../../components/Spinner";
import ComboBox from "../../components/ComboBox";
import NetForesTwoService from "../../services/Scenathon2021/NetForesTwoService";
import BarChart3 from "../../components/Scenathon2021/BarChart3";
import ConvertToCSV from "../../components/ConvertToCSV";
import TradeReportMap from "../../pages/TradeReportMap";
import scenathonIterationsLabels from "../../data/scenathon_iterations_labels.json";
const DrawNfch2 = (props) => {
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

  const [state, setState] = useState({
    select: {
      GraficaType: "group",
      scenathon_id: props.year.scenathon_id,
      iteration: "1",
      ScenathonYear: props.year.year,
    },
  });

  const [chart, setChart] = useState([]);
  const [json, setJson] = useState([
    {
      Chart: [],
      CSV: [],
      Pathways: [],
    },
  ]);

  const [pathways, setPathways] = useState([]);
  const [tradeAdjustments, setTradeAdjustments] = useState([]);
  const [tradeAdjustmentsOptions, setTradeAdjustmentsOptions] = useState([]);

  const DownloadCSV = (e) => {
    ConvertToCSV(json.CSV);
  };

  useEffect(() => {
    // In means that the year has been changed
    if (state.select.ScenathonYear !== props.year.year) {
      state.select.scenathon_id = props.year.scenathon_id;
      state.select.ScenathonYear = props.year.year;
    }

    NetForesTwoService(state).then(function (value) {
      setJson(value);
      setChart(value.Chart);

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
    });
  }, [state, props]);

  const handleChange = async (e) => {
    var group = state.select.GraficaType;
    var scenathon = state.select.scenathon_id;
    var iteration = state.select.iteration;
    var scenathonYear = state.select.ScenathonYear;

    console.log("NetForestCoverChange2 handleChange: ", e.target);

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

  return (
    <Suspense fallback={<Spinner />}>
      <div>
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
      </div>

      <div className="protected-graph-wrapper">
        <BarChart3
          data={chart}
          labelString="1000 ha per 5 years"
          chartHeight={"35em"}
        />
        <FooterTxt
          txt={
            "Contribution by country to cumulated forest loss due to crop, pasture, and/or urban expansion and forest gain due to afforestation in 1000 ha per year (average annual change over each 5 year-period e.g. 2005 corresponds to 2001 and 2005)."
          }
        />
      </div>
    </Suspense>
  );
};
export default DrawNfch2;
