import React, { useState, useEffect, Suspense } from "react";
import Spinner from "../../components/Spinner";

import BarChartBig from "../../components/BarChartBig";
import ComboBox from "../../components/ComboBox";
import ComboBoxPathway from "../../components/ScenathonPrivate/ComboBoxPathway";
import LandCoverService from "../../services/ScenathonPrivate/LandCoverService";
import ConvertToCSV from "../../components/ConvertToCSV";
import ComboBoxTradeAdjusment from "../../components/ScenathonPrivate/ComboBoxTradeAdjusment";
import ComboBoxCountrySelection from "../../components/ScenathonPrivate/ComboBoxCountrySelection";

const DrawLandCover = (props) => {
  console.log("LandCover props: ", props);
  const getTradeAdjusments = function ({ iterations }) {
    const tradeAdjustmentsList = [];

    console.log("LandCover getTradeAdjusments: ", iterations);

    for (var i = 0; i < Object.keys(iterations).length; i++) {
      const iterationsLabel = Object.keys(iterations)[i];

      tradeAdjustmentsList.push(iterationsLabel);
    }

    console.log("LandCover tradeAdjustmentsList: ", tradeAdjustmentsList);

    return tradeAdjustmentsList;
  };

  const getScenathonId = function (scenathon_label) {
    console.log("LandCover getScenathonId scenathon_label: ", scenathon_label);

    for (var i = 0; i < Object.keys(tradeAdjustments).length; i++) {
      const iterationsKey = Object.keys(tradeAdjustments)[i];
      console.log("LandCover iterationsKey: ", iterationsKey);

      const itObject = tradeAdjustments[iterationsKey];
      console.log("LandCover itObject: ", itObject);

      const itLabel = itObject.label;
      console.log("LandCover itLabel: ", itLabel);

      if (itLabel === scenathon_label) {
        return "" + iterationsKey;
      }
    }
  };

  const [pathways, setPathways] = useState([]);
  const [tradeAdjustments, setTradeAdjustments] = useState([]);
  const [tradeAdjustmentsOptions, setTradeAdjustmentsOptions] = useState([]);
  const [chart, setChart] = useState({});
  const [countries, setCountries] = useState([]);

  var [state, setState] = useState({
    select: {
      GraficaType: "group",
      scenathon_id: props.year.scenathon_id,
      iteration: "1",
      ScenathonYear: props.year.year,
      country: "",
    },
  });

  useEffect(() => {
    // In means that the year has been changed
    if (state.select.ScenathonYear !== props.year.year) {
      state.select.scenathon_id = props.year.scenathon_id;
      state.select.ScenathonYear = props.year.year;
    }

    LandCoverService(state).then(function (value) {

      
      console.log("LandCover value: ", value);
      setCountries(["World", ...value.Countries]);
      setChart(value.Chart);
      setPathways(value.Pathways);
      setTradeAdjustments(value.TradeAdjustments);
      setTradeAdjustmentsOptions(
        getTradeAdjusments(value.TradeAdjustments[state.select.scenathon_id])
      );
    });
  }, [state, props]);



  const handleChange = async (e) => {
    var group = state.select.GraficaType;
    var scenathon = state.select.scenathon_id;
    var iteration = state.select.iteration;
    var scenathonYear = state.select.ScenathonYear;
    var country = state.select.country;

    switch (e.target.name) {
      case "country_selection":
        country = e.target.value;

        if (country == "World") {
          country = "";
        }

        break;

      case "scenathon_id": //pathway
        scenathon = getScenathonId(e.target.value);
        break;

      case "iteration":
        iteration = e.target.value;
        country = "";
        setCountries([]);
        break;
    }

    setState({
      select: {
        GraficaType: group,
        scenathon_id: scenathon,
        iteration: iteration,
        ScenathonYear: scenathonYear,
        country: country,
      },
    });
  };

  return (
    <div>
      <Suspense fallback={<Spinner />}>
        <div>
          <div className="contenedor-selects">
            <div style={{ marginRight: "auto" }}></div>
            <ComboBoxCountrySelection
              data={countries}
              onChange={handleChange}
            />
            <ComboBoxPathway onChange={handleChange} data={pathways} />
            <ComboBoxTradeAdjusment
              data={tradeAdjustmentsOptions}
              onChange={handleChange}
            />
          </div>
          <div className="graph">
            <div className="graph-wrapper">
              <div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "left",
                    height: "35em",
                    width: "65vw",
                  }}
                >
                  <BarChartBig
                    data={chart}
                    title=""
                    labelString="1000 ha per year"
                    chartHeight={"35em"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Suspense>
    </div>
  );
};

export default DrawLandCover;
