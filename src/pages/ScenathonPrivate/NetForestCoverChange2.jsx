import React, { useState, useEffect, Suspense } from "react";
import "../../../node_modules/react-grid-layout/css/styles.css";
import "../../../node_modules/react-resizable/css/styles.css";
import FooterTxt from "../../components/FooterTxt";
import ComboBoxPathway from "../../components/ScenathonPrivate/ComboBoxPathway";
import ComboBoxTradeAdjusment from "../../components/ScenathonPrivate/ComboBoxTradeAdjusment";
import Spinner from "../../components/Spinner";
import NetForesTwoService from "../../services/ScenathonPrivate/NetForesTwoService";
import BarchartSuspense from "../../components/ScenathonPrivate/BarchartSuspense";
import ComboBoxCountrySelection from "../../components/ScenathonPrivate/ComboBoxCountrySelection";
const DrawNfch2 = (props) => {
  console.log("NetForestCoverChange2 props: ", props);

  const getTradeAdjusments = function ({ iterations }) {
    const tradeAdjustmentsList = [];

    console.log("NetForestCoverChange2 getTradeAdjusments: ", iterations);

    for (var i = 0; i < Object.keys(iterations).length; i++) {
      const iterationsLabel = Object.keys(iterations)[i];

      tradeAdjustmentsList.push(iterationsLabel);
    }

    console.log(
      "NetForestCoverChange2 tradeAdjustmentsList: ",
      tradeAdjustmentsList
    );

    return tradeAdjustmentsList;
  };

  const getScenathonId = function (scenathon_label) {
    console.log(
      "NetForestCoverChange2 getScenathonId scenathon_label: ",
      scenathon_label
    );

    for (var i = 0; i < Object.keys(tradeAdjustments).length; i++) {
      const iterationsKey = Object.keys(tradeAdjustments)[i];
      console.log("NetForestCoverChange2 iterationsKey: ", iterationsKey);

      const itObject = tradeAdjustments[iterationsKey];
      console.log("NetForestCoverChange2 itObject: ", itObject);

      const itLabel = itObject.label;
      console.log("NetForestCoverChange2 itLabel: ", itLabel);

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
      country: ""
    },
  });
  const [countries, setCountries] = useState([]);
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

  useEffect(() => {
    // In means that the year has been changed
    if (state.select.ScenathonYear !== props.year.year) {
      state.select.scenathon_id = props.year.scenathon_id;
      state.select.ScenathonYear = props.year.year;
    }

    NetForesTwoService(state).then(function (value) {

      const countryOptions =["World"];

      value.Countries.forEach((element) => {
        countryOptions.push(element);
      })

      setCountries(countryOptions);
      setJson(value);
      setPathways(value.Pathways);
      setChart(value.Chart);

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

    console.log("NetForestCoverChange2 handleChange: ", e.target);

    switch (e.target.name) {

      case "country_selection":

      country = e.target.value;

        if (country  == "World"){
          country = ""
        }
        
        break;

      case "GraficaType":
        group = e.target.value;
        break;

      case "scenathon_id": //pathway
        scenathon = getScenathonId(e.target.value);

        break;

      case "iteration":
        iteration = e.target.value;
        country = ""
        setCountries([])
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
    <Suspense fallback={<Spinner />}>
      <div>
        <div className="contenedor-selects">
          <div style={{ marginRight: "auto" }}></div>

          {/* <ComboBoxYear defaultValue={selectedYear.year} onChange={handleChange} /> */}
          <ComboBoxCountrySelection data={countries} onChange={handleChange} />
          <ComboBoxPathway data={pathways} onChange={handleChange} />
          <ComboBoxTradeAdjusment
            data={tradeAdjustmentsOptions}
            onChange={handleChange}
          />
        
        </div>
        <div
          className="graph"
          style={{
            display: "flex",
            flexDirection: "column",
            height: "35em",
            width: "65vw",
            margin: "auto",
          }}
        >
          <div className="graph-wrapper">
            <div style={{ width: "65vw" }}>
              <div
                style={{
                  textAlign: "left",
                  height: "35em",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <BarchartSuspense
                  data={chart}
                  title=""
                  labelString="1000 ha per 5 years"
                />
              </div>
            </div>
          </div>
          <FooterTxt
            txt={
              "Contribution by country to cumulated forest loss due to crop, pasture, and/or urban expansion and forest gain due to afforestation in 1000 ha per year (average annual change over each 5 year-period e.g. 2005 corresponds to 2001 and 2005)."
            }
          />
        </div>
      </div>
    </Suspense>
  );
};
export default DrawNfch2;
