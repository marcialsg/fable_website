import React, { useState, useEffect } from "react";
import BarChart2 from "../../components/Scenathon2021/BarChart2.jsx";
import FoodEnergyTwoService from "../../services/Scenathon2021/FoodEnergyTwoService";
import ComboBoxFoodEnergy from "../../components/ComboBox";
import ComboBoxPathway from "../../components/Scenathon2021/ComboBoxPathway.jsx";
import ConvertToCSV from "../../components/ConvertToCSV";
import ComboBoxTradeAdjusment from "../../components/Scenathon2021/ComboBoxTradeAdjusment";
import FooterTxt from "../../components/FooterTxt";

const FoodEnergyIntakePerCapita = (props) => {

  const getScenathonId = function (scenathon_label) {
    // console.log(
    //   "FoodEnergyIntakePerCapita2 getScenathonId scenathon_label: ",
    //   scenathon_label
    // );

    for (var i = 0; i < Object.keys(tradeAdjustments).length; i++) {
      const iterationsKey = Object.keys(tradeAdjustments)[i];
      // console.log("FoodEnergyIntakePerCapita2 iterationsKey: ", iterationsKey);

      const itObject = tradeAdjustments[iterationsKey];
      // console.log("FoodEnergyIntakePerCapita2 itObject: ", itObject);

      const itLabel = itObject.label;
      // console.log("FoodEnergyIntakePerCapita2 itLabel: ", itLabel);

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
    },
  });

  const [json, setJson] = useState({
    labels: [],
    datasets: [],
    CSV: [],
    Pathways: [],
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

    FoodEnergyTwoService(state).then(function (value) {
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
      setTradeAdjustmentsOptions(Object.keys(value.TradeAdjustments[state.select.scenathon_id]["iterations"]));



    });
  }, [state, props]);

  const handleChange = async (e) => {
    var year = state.select.Year;
    var scenathon = state.select.scenathon_id;
    var iteration = state.select.iteration;
    var scenathonYear = state.select.ScenathonYear;

    switch (e.target.name) {
      case "Year":
        year = e.target.Year;
        break;

      case "scenathon_id": //pathway
        scenathon = getScenathonId(e.target.value);
        iteration = Object.keys(tradeAdjustments[scenathon]["iterations"])[0];
        setTradeAdjustmentsOptions([])
        break;

      case "iteration":
        iteration = e.target.value;
        break;
    }

    setState({
      select: {
        GraficaType: "group",
        scenathon_id: scenathon,
        iteration: iteration,
        ScenathonYear: scenathonYear,
        Year: year,
      },
    });
  };

  const DownloadCSV = (e) => {
    ConvertToCSV(json.CSV);
  };
  return (
    <div>
      <div className="contenedor-selects">
        <div style={{ marginRight: "auto" }}></div>
        {/* <ComboBoxYear onChange={handleChange} /> */}
        <ComboBoxPathway onChange={handleChange} data={pathways} />
        <ComboBoxTradeAdjusment
          data={tradeAdjustmentsOptions}
          onChange={handleChange}
        />
        <ComboBoxFoodEnergy onChange={handleChange} onClick={DownloadCSV} />
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
        <div>
          <div>
            <div
              style={{
                textAlign: "left",
                height: "35em",
                width: "65vw",
                margin: "auto",
              }}
            >
              <BarChart2
                data={json}
                labelString="Gr per capita per day"
                title=""
              />

              <FooterTxt
                txt={
                  "Average gr per capita per day of fat and protein feasible by country and selected year"
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
