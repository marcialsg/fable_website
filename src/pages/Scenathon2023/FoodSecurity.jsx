import React, { Suspense, useState, useEffect } from "react";
import MixedChartBig from "../../components/Scenathon2021/MixedChartBig";
import FoodEnergyService from "../../services/Scenathon2023/FoodEnergyService";
import LineChart from "../../components/Scenathon2023/LineChart";

import Spinner from "../../components/Spinner";
import ComboBox from "../../components/ComboBox";
import ComboBoxPathway from "../../components/Scenathon2023/ComboBoxPathway";
import ComboBoxTradeAdjusment from "../../components/Scenathon2021/ComboBoxTradeAdjusment";
import ConvertToCSV from "../../components/ConvertToCSV";
import ComboBoxCountrySelection from "../../components/ScenathonPrivate/ComboBoxCountrySelection";
import scenathonIterationsLabels from "../../data/scenathon_iterations_labels.json";

import "../../css/index.css";

const FoodSecurity = (props) => {
  const [scenathonData, setScenathonData] = useState({});
  var target_data = require("../../assets/2023_target_data.json");

  const target = target_data.target_data[props.targetIndex].targetDomain;

  var indicator =
    target_data.target_data[props.targetIndex].indicators[props.indicatorIndex];

  const [mIndicator, setIndicator] = useState(indicator);

  const [pathways, setPathways] = useState([]);

  const [countries, setCountries] = useState([]);

  const [tradeAdjustments, setTradeAdjustments] = useState({});

  const [tradeAdjustmentsOptions, setTradeAdjustmentsOptions] = useState([]);

  const [laoder, setLoader] = useState(false);

  //Hay que mejorar esta parte por que esta hardcode;(revisar la linea 114)

  let [state, setState] = useState({
    select: {
      Year: "2030",
      scenathon_id: "16",
      PathwayId: "1",
      iteration: props.iteration,
      ScenathonYear: "2023",
      country: "",
      type: props.type,
    },
  });

  const [json, setJson] = useState({
    labels: [],
    datasets: [],
    CSV: [],
    Pathways: [],
  });

  useEffect(() => {
    // In means that the year has been changed
    // if (state.select.ScenathonYear !== props.year.year) {
    //   state.select.scenathon_id = props.year.scenathon_id;
    //   state.select.ScenathonYear = props.year.year;
    // }
    //console.log("este es el valor del combobox: "+ComboBoxCountrySelection.target.value);

    if (indicator !== mIndicator) {
      setJson({
        labels: [],
        datasets: [],
        CSV: [],
        Pathways: [],
      });
    }

    setLoader(true);

    FoodEnergyService(
      target.toLowerCase().replace(/\s/g, "_"),
      indicator.toLowerCase().replace(/\s/g, "_"),
      state
    ).then(function (value) {
      // console.log("returned FoodEnergyService value: ", value);

      setJson(value);

      if (value.CSV.length > 0) {
        const pathwaysData =
          value.scenathonData[state.select.scenathon_id].pathways;

        setScenathonData(pathwaysData);

        var pathwayOptions = [];
        var iterationsLabels = [];
        var returnCountries = [];

        for (const [pathwayKey, pathwayValue] of Object.entries(pathwaysData)) {
          var pathwayValuenewformat = pathwayValue.label
            .replace(/([A-Z])/g, " $1")
            .trim();
          pathwayValuenewformat = pathwayValuenewformat.replace(/  +/g, " ");
          pathwayOptions.push(
            <option value={pathwayKey}>{pathwayValuenewformat}</option>
          );
        }

        for (const [iterationKey, iterationValue] of Object.entries(
          pathwaysData[state.select.PathwayId].iteration
        )) {
          const iterationLabel = iterationValue.iterationLabel;
          var tempCountries = [],
            tempRest = [];
          for (let i = 0; i < iterationValue.countries.length; i++) {
            if (iterationValue.countries[i].includes("Rest")) {
              tempRest.push(iterationValue.countries[i]);
            } else {
              tempCountries.push(iterationValue.countries[i]);
            }
          }
          returnCountries = tempCountries.sort().concat(tempRest.sort());

          if (state.select.type == "2") {
            state.select.iteration = "3";
            if (
              (iterationLabel == "Before" || iterationLabel == "After") &&
              iterationKey < 4
            ) {
              iterationsLabels.push(
                <option value={iterationKey}>{iterationLabel}</option>
              );
            }
          } else {
            state.select.iteration = "5";
            if (
              (iterationLabel == "Before" || iterationLabel == "After") &&
              iterationKey >= 4
            ) {
              iterationsLabels.push(
                <option value={iterationKey}>{iterationLabel}</option>
              );
            }
          }
        }
        const countryOptions = [...returnCountries];
        //  if (
        //     indicator === target_data.target_data[props.targetIndex].indicators[1]
        //   ) {
        //     countryOptions = [...returnCountries.sort()];
        //   }

        setCountries(countryOptions);
        setPathways(pathwayOptions);
        setTradeAdjustmentsOptions(iterationsLabels.reverse());
        setLoader(false);
      }

      setLoader(false);
    });
  }, [state, props]);

  let component = null;

  switch (indicator) {
    case target_data.target_data[props.targetIndex].indicators[0]:
      state.select.country = "";
      component = (
        <MixedChartBig
          rotate={
            indicator ===
            target_data.target_data[props.targetIndex].indicators[0]
          }
          data={json}
          labelString="kcal / cap / day"
          title="ARG: Argentina | AUS: Australia | BRA: Brazil | CAN: Canada | CHN: China | COL: Colombia | DEU: Germany | DNK: Denmark | ETH: Ethiopia | FIN: Finland | GBR: United Kingdom | GRC: Greece | IDN: Indonesia | IND: India | MEX: Mexico | NOR: Norway | NPL: Nepal | RUS: Russia | RWA: Rwanda | SWE: Sweden | TUR: Turkey | USA: United States of America | R_ASP: Rest of Asia and Pacific | R_CSA: Rest of Central and South America | RMECAS: Rest of Middle East Central Asia | R_NEU: Rest of Europe non EU28 | R_OEU: Rest of European Union | R_SSA: Rest of Sub-Saharan Africa"
          chartHeight={"38rem"}
          chartWidth={"100%"}
          max={4000}
        />
      );
      break;
    case target_data.target_data[props.targetIndex].indicators[1]:
      if (state.select.country == "" || state.select.country == "World") {
        state.select.country = "Argentina";
        console.log("ENTRO AL IF");
      }
      console.log("ENTRO AL CASE");
      component = (
        <MixedChartBig
          rotate={
            indicator ===
            target_data.target_data[props.targetIndex].indicators[1]
          }
          data={json}
          labelString="kcal / cap / day"
          title=""
          chartHeight={"38rem"}
          chartWidth={"100%"}
        />
      );

      break;
    case target_data.target_data[props.targetIndex].indicators[2]:
      state.select.country = "";
      component = (
        <MixedChartBig
          rotate={
            indicator ===
            target_data.target_data[props.targetIndex].indicators[2]
          }
          data={json}
          labelString="% of total population undernourished"
          title="ARG: Argentina | AUS: Australia | BRA: Brazil | CAN: Canada | CHN: China | COL: Colombia | DEU: Germany | DNK: Denmark | ETH: Ethiopia | FIN: Finland | GBR: United Kingdom | GRC: Greece | IDN: Indonesia | IND: India | MEX: Mexico | NOR: Norway | NPL: Nepal | RUS: Russia | RWA: Rwanda | SWE: Sweden | TUR: Turkey | USA: United States of America | R_ASP: Rest of Asia and Pacific | R_CSA: Rest of Central and South America | RMECAS: Rest of Middle East Central Asia | R_NEU: Rest of Europe non EU28 | R_OEU: Rest of European Union | R_SSA: Rest of Sub-Saharan Africa"
          chartHeight={"38rem"}
          chartWidth={"100%"}
          max={25}
        />
      );
      break;
    case target_data.target_data[props.targetIndex].indicators[3]:
      if (state.select.country == "" || state.select.country == "World") {
        state.select.country = "Argentina";
        console.log("ENTRO AL IF");
      }
      console.log("ENTRO AL CASE");
      component = (
        <MixedChartBig
          rotate={
            indicator ===
            target_data.target_data[props.targetIndex].indicators[3]
          }
          data={json}
          labelString="% of total population undernourished"
          title=""
          chartHeight={"38rem"}
          chartWidth={"100%"}
        />
      );

      break;
      // case target_data.target_data[props.targetIndex].indicators[2]:
      //   component = (
      //     <LineChart data={json} title="DUMMY FOOD1" labelString="Gt CO2e" />
      //   );
      //   break;
      // case target_data.target_data[props.targetIndex].indicators[3]:
      component = (
        <LineChart data={json} title="DUMMY FOOD2" labelString="Gt CO2e" />
      );
      break;
    // default:
    //   return <h2> {target}</h2>;
  }

  const handleChange = async (e) => {
    var pathway_id = state.select.PathwayId;
    var iteration = state.select.iteration;
    var scenathonYear = state.select.ScenathonYear;
    var country = state.select.country;
    var type = state.select.type;

    switch (e.target.name) {
      case "country_selection":
        country = e.target.value;
        console.log("Valor del country: ", e.target.value);
        if (country == "World") {
          country = "";
        }

        break;

      case "pathway_id": //pathway
        pathway_id = e.target.value;

        // var iterationKey = Object.keys(
        //   scenathonData[pathway_id].iteration
        // ).find((key) =>
        //   scenathonData[pathway_id].iteration[key].iterationLabel.includes(
        //     "before"
        //   )
        // );

        // console.log("before iterationKey: ", iterationKey);
        iteration = state.select.iteration;
        setTradeAdjustmentsOptions([]);
        break;

      case "iteration":
        iteration = e.target.value;
        break;
    }

    setState({
      select: {
        Year: "2030",
        scenathon_id: state.select.scenathon_id,
        iteration: iteration,
        ScenathonYear: scenathonYear,
        PathwayId: pathway_id,
        country: country,
        type: type,
      },
    });
  };
  return (
    <div>
      <Suspense fallback={<Spinner />}>
        <div>
          <div className="contenedor-selects">
            {indicator ===
            target_data.target_data[props.targetIndex].indicators[1] || indicator === target_data.target_data[props.targetIndex].indicators[3] ? (
              <ComboBoxCountrySelection
                defaultValue={
                  state.select.country === ""
                    ? countries[0]
                    : state.select.country
                }
                data={countries}
                onChange={handleChange}
              />
            ) : (
              ""
            )}
            <ComboBoxPathway onChange={handleChange} data={pathways} />
            <ComboBoxTradeAdjusment
              data={tradeAdjustmentsOptions}
              onChange={handleChange}
            />
          </div>
          <div className="graph-wrapper">
            {laoder ? (
              <div class="loader"></div>
            ) : json.datasets.length === 0 ? (
              <div>No values for the given input data</div>
            ) : (
              component
            )}
          </div>
        </div>
      </Suspense>
    </div>
  );
};

export default FoodSecurity;
