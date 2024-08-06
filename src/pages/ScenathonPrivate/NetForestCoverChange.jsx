import React, { useState, useEffect } from "react";
import MixedChartZero from "../../components/ScenathonPrivate/MixedChartBig";
import ComboBoxTradeAdjusment from "../../components/ScenathonPrivate/ComboBoxTradeAdjusment";
import ComboBoxPathway from "../../components/ScenathonPrivate/ComboBoxPathway";
import NetForestCoverService from "../../services/ScenathonPrivate/NetForestCoverService";
import ComboBoxCountrySelection from "../../components/ScenathonPrivate/ComboBoxCountrySelection";
import "../../css/index.css";

const DrawNfch = (props) => {
  console.log("NetForestCoverChange props: ", props);

  const [state, setState] = useState({
    select: {
      GraficaType: "group",
      scenathon_id: props.year.scenathon_id,
      iteration: "1",
      ScenathonYear: props.year.year,
      country: ""
    },
  });

  const getTradeAdjusments = function ({ iterations }) {
    const tradeAdjustmentsList = [];

    console.log("NetForestCoverChange getTradeAdjusments: ", iterations);

    for (var i = 0; i < Object.keys(iterations).length; i++) {
      const iterationsLabel = Object.keys(iterations)[i];

      tradeAdjustmentsList.push(iterationsLabel);
    }

    console.log(
      "NetForestCoverChange tradeAdjustmentsList: ",
      tradeAdjustmentsList
    );

    return tradeAdjustmentsList;
  };

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

  const [taDefaultValue, setTaDefaultValue] = useState("1");

  const [json, setJson] = useState([
    {
      labels: [],
      datasets: [],
      CSV: [],
      Pathways: [],
      TradeAdjustments: {},
    },
  ]);
  
  const [countries, setCountries] = useState([]);
  const [pathways, setPathways] = useState([]);
  const [tradeAdjustments, setTradeAdjustments] = useState([]);
  const [tradeAdjustmentsOptions, setTradeAdjustmentsOptions] = useState([]);

  useEffect(() => {
    // In means that the year has been changed

    console.log("NetForestCoverChange useEffect state: ", state);
    console.log("NetForestCoverChange useEffect props.year.year: ", props.year.year);
    if (state.select.ScenathonYear !== props.year.year) {
      state.select.scenathon_id = props.year.scenathon_id;
      state.select.ScenathonYear = props.year.year;
    }

    NetForestCoverService(state).then(function (value) {

      console.log("NetForestCoverChange useEffect value: ", value);
      const countryOptions =["World"];

      value.Countries.forEach((element) => {
        countryOptions.push(element);
      })

      setCountries(countryOptions); 
      setJson(value);
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

    // console.log("NetForestCoverChange handleChange e.target: ", e.target);

    switch (e.target.name) {
      case "country_selection":

      country = e.target.value;

        if (country  == "World"){
          country = ""
        }
        
        break;

      case "iteration":
        iteration = e.target.value;
        country = ""
        setCountries([])
        break;

      case "scenathon_id": //pathway
        scenathon = getScenathonId(e.target.value);
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
    <div>
      <div className="contenedor-selects">
        <div style={{ marginRight: "auto" }}></div>
        {/* <ComboBoxYear defaultValue={selectedYear.year} onChange={handleChange} /> */}
        <ComboBoxCountrySelection data={countries} onChange={handleChange} />
        <ComboBoxPathway onChange={handleChange} data={pathways} />
        <ComboBoxTradeAdjusment
          data={tradeAdjustmentsOptions}
          onChange={handleChange}
          default={taDefaultValue}
        />
       
      </div>
      <div className="graph">
        <div className="graph-wrapper">
          <div>
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
                Forest loss due to crop, pasture, and/or urban expansion and
                forest gain due to afforestation in 1000 ha per 5-year periods
                (2005 corresponds to years 2001 to 2005). Source of historical
                data:
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrawNfch;
