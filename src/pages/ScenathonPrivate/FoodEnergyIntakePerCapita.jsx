import React, { useState, useEffect } from "react";
import MixedChartBig from "../../components/ScenathonPrivate/MixedChartBig";
import ComboBoxFoodEnergy from "../../components/ScenathonPrivate/ComboBoxFoodEnergy.jsx";
import ComboBoxPathway from "../../components/ScenathonPrivate/ComboBoxPathway.jsx";
import FoodEnergyService from "../../services/ScenathonPrivate/FoodEnergyService";
import ConvertToCSV from "../../components/ConvertToCSV";
import ComboBoxTradeAdjusment from "../../components/ScenathonPrivate/ComboBoxTradeAdjusment";
import FooterTxt from "../../components/FooterTxt";
import ComboBoxCountrySelection from "../../components/ScenathonPrivate/ComboBoxCountrySelection";

//No se esta usando esta clase
const FoodEnergyIntakePerCapita = (props) => {
  const getTradeAdjusments = function ({ iterations }) {
    const tradeAdjustmentsList = [];

    console.log("FoodEnergyIntakePerCapita getTradeAdjusments: ", iterations);

    for (var i = 0; i < Object.keys(iterations).length; i++) {
      const iterationsLabel = Object.keys(iterations)[i];

      tradeAdjustmentsList.push(iterationsLabel);
    }

    console.log(
      "FoodEnergyIntakePerCapita tradeAdjustmentsList: ",
      tradeAdjustmentsList
    );

    return tradeAdjustmentsList;
  };

  const getScenathonId = function (scenathon_label) {
    console.log(
      "FoodEnergyIntakePerCapita getScenathonId scenathon_label: ",
      scenathon_label
    );

    for (var i = 0; i < Object.keys(tradeAdjustments).length; i++) {
      const iterationsKey = Object.keys(tradeAdjustments)[i];
      console.log("FoodEnergyIntakePerCapita iterationsKey: ", iterationsKey);

      const itObject = tradeAdjustments[iterationsKey];
      console.log("FoodEnergyIntakePerCapita itObject: ", itObject);

      const itLabel = itObject.label;
      console.log("FoodEnergyIntakePerCapita itLabel: ", itLabel);

      if (itLabel === scenathon_label) {
        return "" + iterationsKey;
      }
    }
  };

  const [state, setState] = useState({
    select: {
      Year: "2030",
      GraficaType: "group",
      scenathon_id: props.year.scenathon_id,
      iteration: "1",
      ScenathonYear: props.year.year,
      country: ""
    },
  });

  const [json, setJson] = useState({
    labels: [],
    datasets: [],
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

    FoodEnergyService("Zerohunger", state).then(function (value) {
      
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
    var year = state.select.Year;
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
      case "Year":
        year = e.target.Year;
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
        scenathon_id: scenathon,
        iteration: iteration,
        ScenathonYear: scenathonYear,
        Year: year,
        country: country
      },
    });
  };

  return (
    <div>
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
          <div>
            <div style={{ textAlign: "left", height: "35em", width: "65vw" }}>
              <MixedChartBig
                data={json}
                labelString="Kcal per capita per day"
                title=""
                chartHeight={"35em"}
              />
              <FooterTxt
                txt={
                  "Energy intake and Minimum Dietary Energy Requirement (MDER) in kilocalories per capita per day."
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FoodEnergyIntakePerCapita;
