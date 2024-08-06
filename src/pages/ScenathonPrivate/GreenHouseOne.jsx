import React, { useState, useEffect, Suspense } from "react";
import SuperGraph from "../../components/Scenathon2021/SuperGraph";
import ComboBox from "../../components/ComboBox";
import ComboBoxPathway from "../../components/ScenathonPrivate/ComboBoxPathway";
import GreenHouseService from "../../services/ScenathonPrivate/GreenHouseService";
import ConvertToCSV from "../../components/ConvertToCSV";
import ComboBoxTradeAdjusment from "../../components/ScenathonPrivate/ComboBoxTradeAdjusment";
import FooterTxt from "../../components/FooterTxt";
import Spinner from "../../components/Spinner";
import ComboBoxCountrySelection from "../../components/ScenathonPrivate/ComboBoxCountrySelection";

const DrawGreenhouse1 = (props) => {
  const getTradeAdjusments = function ({ iterations }) {
    const tradeAdjustmentsList = [];

    console.log("GreenHouseOne getTradeAdjusments: ", iterations);

    for (var i = 0; i < Object.keys(iterations).length; i++) {
      const iterationsLabel = Object.keys(iterations)[i];

      tradeAdjustmentsList.push(iterationsLabel);
    }

    console.log("GreenHouseOne tradeAdjustmentsList: ", tradeAdjustmentsList);

    return tradeAdjustmentsList;
  };

  const getScenathonId = function (scenathon_label) {
    console.log(
      "GreenHouseOne getScenathonId scenathon_label: ",
      scenathon_label
    );

    for (var i = 0; i < Object.keys(tradeAdjustments).length; i++) {
      const iterationsKey = Object.keys(tradeAdjustments)[i];
      console.log("GreenHouseOne iterationsKey: ", iterationsKey);

      const itObject = tradeAdjustments[iterationsKey];
      console.log("GreenHouseOne itObject: ", itObject);

      const itLabel = itObject.label;
      console.log("GreenHouseOne itLabel: ", itLabel);

      if (itLabel === scenathon_label) {
        return "" + iterationsKey;
      }
    }
  };

  const [countries, setCountries] = useState([]);

  const [state, setState] = useState({
    select: {
      GraficaType: "group",
      scenathon_id: props.year.scenathon_id,
      iteration: "1",
      ScenathonYear: props.year.year,
      country: ""
    },
  });

  const [data, setdata] = useState({
    chartOne: [],
    charTwo: [],
  });

  const [pathways, setPathways] = useState([]);
  const [tradeAdjustments, setTradeAdjustments] = useState([]);
  const [tradeAdjustmentsOptions, setTradeAdjustmentsOptions] = useState([]);

  useEffect(() => {
    // In means that the year has been changed
    if (state.select.ScenathonYear !== props.year.year) {
      state.select.scenathon_id = props.year.scenathon_id;
      state.select.ScenathonYear = props.year.year;
    }

    GreenHouseService(state).then(function (value) {
      const countryOptions = ["World", ...value.Countries]
      
      setCountries(countryOptions);

      setdata(value);
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

        if (country  == "World"){
          country = ""
        }
        
        break;
      case "GraficaType":
        group = e.target.GraficaType;
        break;

      case "scenathon_id": //pathway
        scenathon = getScenathonId(e.target.value);
        break;

      case "iteration":
        iteration = e.target.value;
        country = ""
        setCountries([])
        break;

      case "ScenathonYear":
        scenathonYear = e.target.value;

        switch (scenathonYear) {
          case "2021":
            scenathon = "7";
            break;

          case "2020":
            scenathon = "5";
            break;
        }

        iteration = "1";
        //TODO: update THE OTHER COMBOBOXES
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
      <Suspense fallback={<Spinner />}>
        <div className="contenedor-selects">
          <div style={{ marginRight: "auto" }}></div>
          <ComboBoxCountrySelection data={countries} onChange={handleChange} />
          <ComboBoxPathway onChange={handleChange} data={pathways} />
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
            <div style={{ width: "32.5vw" }}>
              <div
                style={{
                  textAlign: "left",
                  height: "35em",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <SuperGraph
                  data={data.chartOne}
                  title=""
                  labelString="Gt CO2e"
                />
              </div>
              <FooterTxt
                txt={"Annual GHG emissions from crops and livestock."}
              />
            </div>
            <div style={{ width: "32.5vw" }}>
              <div
                style={{
                  textAlign: "left",
                  height: "35em",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <SuperGraph
                  data={data.charTwo}
                  title=""
                  labelString="Gt CO2e"
                />
              </div>
              <FooterTxt
                txt={
                  "Average annual GHG emissions from land use change and peat oxidation."
                }
              />
            </div>
          </div>
        </div>
      </Suspense>
    </div>
  );
};

export default DrawGreenhouse1;
