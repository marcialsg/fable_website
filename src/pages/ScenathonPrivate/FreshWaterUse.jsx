import React, { useState, useEffect } from "react";
import BarChartBig from "../../components/BarChartBig";
import ComboBoxPathway from "../../components/ScenathonPrivate/ComboBoxPathway";
import FreshWaterService from "../../services/ScenathonPrivate/FreshWaterService";
import FooterTxt from "../../components/FooterTxt";
import ComboBoxTradeAdjusment from "../../components/ScenathonPrivate/ComboBoxTradeAdjusment";
import ComboBoxCountrySelection from "../../components/ScenathonPrivate/ComboBoxCountrySelection";

const DrawFreshWaterUse = (props) => {
  const getTradeAdjusments = function ({ iterations }) {
    const tradeAdjustmentsList = [];

    //console.log("FreshWaterUse getTradeAdjusments: ", iterations);

    for (var i = 0; i < Object.keys(iterations).length; i++) {
      const iterationsLabel = Object.keys(iterations)[i];

      tradeAdjustmentsList.push(iterationsLabel);
    }

    //console.log("FreshWaterUse tradeAdjustmentsList: ", tradeAdjustmentsList);

    return tradeAdjustmentsList;
  };

  const getScenathonId = function (scenathon_label) {
    //console.log(
    //   "FreshWaterUse getScenathonId scenathon_label: ",
    //   scenathon_label
    // );

    for (var i = 0; i < Object.keys(tradeAdjustments).length; i++) {
      const iterationsKey = Object.keys(tradeAdjustments)[i];
      //console.log("FreshWaterUse iterationsKey: ", iterationsKey);

      const itObject = tradeAdjustments[iterationsKey];
      //console.log("FreshWaterUse itObject: ", itObject);

      const itLabel = itObject.label;
      //console.log("FreshWaterUse itLabel: ", itLabel);

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

  const [chart, setChart] = useState([{}]);

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

    FreshWaterService(state).then(function (value) {

      const countryOptions = ["World", ...value.Countries]
      
      // console.log("FreshWaterService receive: value: ", value)
      // console.log("FreshWaterService receive: countryOptions: ", countryOptions)

      setCountries(countryOptions);
      
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
        {/* <ComboBoxYear onChange={handleChange} /> */}
        <ComboBoxCountrySelection data={countries} onChange={handleChange} />
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
                labelposition="right"
                labelString="Cubic metres"
                title=""
                chartHeight={"35em"}
              />
              <FooterTxt
                txt={
                  "Fresh Water used for irrigation of crops and livestock production"
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DrawFreshWaterUse;
