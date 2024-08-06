import React, { useState, useEffect, Suspense } from "react";
import Spinner from "../../components/Spinner";
import ConvertToCSV from "../../components/ConvertToCSV";
import ComboBoxPathway from "../../components/ScenathonPrivate/ComboBoxPathway";
import ComboBoxTradeAdjusment from "../../components/ScenathonPrivate/ComboBoxTradeAdjusment";
import ComboBox from "../../components/ComboBox";
import GreenHouseTwoService from "../../services/ScenathonPrivate/GreenHouseTwoService";
import FooterTxt from "../../components/FooterTxt";
import BarchartSuspense from "../../components/ScenathonPrivate/BarchartSuspense";
import ComboBoxCountrySelection from "../../components/ScenathonPrivate/ComboBoxCountrySelection";

//nfch=GreenHouse2
const GreenHouse = (props) => {
  const getTradeAdjusments = function ({ iterations }) {
    const tradeAdjustmentsList = [];

    console.log("GreenHouse2 getTradeAdjusments: ", iterations);

    for (var i = 0; i < Object.keys(iterations).length; i++) {
      const iterationsLabel = Object.keys(iterations)[i];

      tradeAdjustmentsList.push(iterationsLabel);
    }

    console.log("GreenHouse2 tradeAdjustmentsList: ", tradeAdjustmentsList);

    return tradeAdjustmentsList;
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

  const [state, setState] = useState({
    select: {
      GraficaType: "group",
      scenathon_id: props.year.scenathon_id,
      iteration: "1",
      ScenathonYear: props.year.year,
      country: ""
    },
  });

  const [json, setJson] = useState({
    chartOne: {},
    charTwo: {},
    CSV: [],
    Pathways: [],
  });

  const [countries, setCountries] = useState([]);
  const [pathways, setPathways] = useState([]);
  const [tradeAdjustments, setTradeAdjustments] = useState([]);
  const [tradeAdjustmentsOptions, setTradeAdjustmentsOptions] = useState([]);

  useEffect(() => {
    // In means that the year has been changed
    if (state.select.ScenathonYear !== props.year.year) {
      state.select.scenathon_id = props.year.scenathon_id;
      state.select.ScenathonYear = props.year.year;
    }

    GreenHouseTwoService(state).then(function (value) {
      
      const countryOptions = ["World", ...value.Countries]
      
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

    switch (e.target.name) {

      case "country_selection":

      country = e.target.value;

        if (country  == "AWorld"){
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
    <div>
      <div className="contenedor-selects">
        <div style={{ marginRight: "auto" }}></div>

        <ComboBoxCountrySelection data={countries} onChange={handleChange} />
        <ComboBoxPathway data={pathways} onChange={handleChange} />
        <ComboBoxTradeAdjusment
          data={tradeAdjustmentsOptions}
          onChange={handleChange}
        />
        
      </div>
      <div className="graph">
        {props.section ? (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "35em",
                width: "65vw",
                margin: "auto",
              }}
            >
              <div
                className="graph-wrapper"
                style={{ width: "65vw", margin: "0 auto 0 auto" }}
              >
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
                    <Suspense fallback={<Spinner />}>
                      <BarchartSuspense
                        data={json}
                        isGrenHouseTwo={true}
                        isChartOne={true}
                        title=""
                        labelString="Gt CO2e"
                      />
                    </Suspense>
                  </div>
                </div>
              </div>
              <FooterTxt
                txt={
                  "Annual GHG emissions from crops and livestock in Gt CO2e by country."
                }
              />
            </div>
          </>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "35em",
                width: "65vw",
                margin: "auto",
              }}
            >
              <div
                className="graph-wrapper"
                style={{ display: "flex", flexDirection: "row" }}
              >
                <div style={{ width: "100%" }}>
                  <div
                    style={{
                      textAlign: "left",
                      height: "35em",
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Suspense fallback={<Spinner />}>
                      <BarchartSuspense
                        data={json}
                        title=""
                        isGrenHouseTwo={true}
                        isChartOne={false}
                        labelString="Gt CO2e"
                      />
                    </Suspense>
                  </div>
                </div>
              </div>
              <FooterTxt
                txt={
                  "Average annual GHG emissions from land use change and peat oxidation in Gt CO2e by country."
                }
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GreenHouse;
