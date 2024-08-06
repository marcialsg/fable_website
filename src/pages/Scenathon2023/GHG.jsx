import React, { Suspense, useState, useEffect } from "react";
import "../../css/index.css";
import GhgStackedChart from "../../components/Scenathon2023/GhgStackedChart";
import GHGService from "../../services/Scenathon2023/GHGService";
import Spinner from "../../components/Spinner";

import ComboBoxPathway from "../../components/Scenathon2023/ComboBoxPathway";
import ComboBoxTradeAdjusment from "../../components/Scenathon2021/ComboBoxTradeAdjusment";

import ComboBoxCountrySelection from "../../components/ScenathonPrivate/ComboBoxCountrySelection";
import GhgDoughnut from "../../components/Scenathon2023/GhgDoughnut";

const GHG = (props) => {
  const [scenathonData, setScenathonData] = useState({});

  const handleChange = async (e) => {
    var pathway_id = state.select.PathwayId;
    var iteration = state.select.iteration;
    var scenathonYear = state.select.ScenathonYear;
    var country = state.select.country;
    var type = state.select.type;

    switch (e.target.name) {
      case "country_selection":
        country = e.target.value;

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

  // console.log("GHG props: ", props);

  var target_data = require("../../assets/2023_target_data.json");

  const target = target_data.target_data[props.targetIndex].targetDomain;

  var indicator =
    target_data.target_data[props.targetIndex].indicators[props.indicatorIndex];

  const [tradeAdjustmentsOptions, setTradeAdjustmentsOptions] = useState([]);

  const [state, setState] = useState({
    select: {
      Year: "2030",
      scenathon_id: "16",
      PathwayId: "1",
      iteration: props.year.iteration,
      ScenathonYear: "2023",
      country: "",
      type: props.type,
    },
  });

  const [json, setJson] = useState({
    datasets: [],
    labels: [],
  });

  const [pathways, setPathways] = useState([]);

  const [countries, setCountries] = useState([]);

  const [cumulativeDoughnutData, setCumulativeDoughnutData] = useState({
    datasets: [],
    labels: [],
  });

  const [agriculturalDoughnutData, setAgriculturalDoughnutData] = useState({
    datasets: [],
    labels: [],
  });

  let component = null;
  const [laoder, setLoader] = useState(false);

  useEffect(() => {
    setJson({
      datasets: [],
      labels: [],
    });

    setCountries([]);
    setLoader(true);

    GHGService(
      target.toLowerCase().replace(/\s/g, "_"),
      indicator.toLowerCase().replace(/\s/g, "_"),
      state
    ).then(function (value) {
      // console.log("returned GHGService value: ", value);

      if (value.CSV.length > 0) {
        setJson(value);

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

        const countryOptions = ["World", ...returnCountries];
        setCountries(countryOptions);
        setPathways(pathwayOptions);
        setTradeAdjustmentsOptions(iterationsLabels.reverse());
        setJson(value.Chart);

        switch (indicator.toLowerCase().replace(/\s/g, "_")) {
          case "cumulative_co2_emissions_from_afolu_2020-2050":
            // console.log("returned GHGService cumulative_co2_emissions_from_afolu_2020-2050: ", value.Chart);
            setCumulativeDoughnutData(value.Chart);
            break;

          case "total_agricultural_emissions_2050":
            // console.log("returned GHGService total_agricultural_emissions_2050: ", value.Chart);
            setAgriculturalDoughnutData(value.Chart);
            break;
        }
      }

      setLoader(false);
    });
  }, [state, props, indicator]);

  var maxi;
  switch (indicator) {
    case target_data.target_data[props.targetIndex].indicators[5]:
      // console.log("GHG indicator 0 : ", indicator);
      if (state.select.country == "") maxi = 200;
      component = (
        <GhgStackedChart
          data={json}
          labelString="Mt CH4"
          chartHeight={"38rem"}
          chartWidth={"100%"}
          min={0}
          max={maxi}
        />
      );
      break;

    case target_data.target_data[props.targetIndex].indicators[0]:
      // console.log("GHG indicator 1 : ", indicator);
      if (state.select.country == "") maxi = 5;
      component = (
        <GhgStackedChart
          data={json}
          labelString="Gt CO2"
          chartHeight={"38rem"}
          chartWidth={"100%"}
          max={maxi}
        />
      );
      break;

    case target_data.target_data[props.targetIndex].indicators[4]:
      // console.log("GHG indicator 4 : ", indicator);
      if (state.select.country == "") maxi = 9;
      component = (
        <GhgStackedChart
          data={json}
          labelString="Gt CO2e"
          title="ARG: Argentina | AUS: Australia | BRA: Brazil | CAN: Canada | CHN: China | COL: Colombia | DEU: Germany | DNK: Denmark | ETH: Ethiopia | FIN: Finland | GBR: United Kingdom | GRC: Greece | IDN: Indonesia | IND: India | MEX: Mexico | NOR: Norway | NPL: Nepal | RUS: Russia | RWA: Rwanda | SWE: Sweden | TUR: Turkey | USA: United States of America | R_ASP: Rest of Asia and Pacific | R_CSA: Rest of Central and South America | RMECAS: Rest of Middle East Central Asia | R_NEU: Rest of Europe non EU28 | R_OEU: Rest of European Union | R_SSA: Rest of Sub-Saharan Africa"
          chartHeight={"38rem"}
          chartWidth={"100%"}
          max={maxi}
        />
      );
      break;

    case target_data.target_data[props.targetIndex].indicators[1]:
      // console.log("GHG indicator 5 : ", indicator);
      console.log("dataset: ",json);
      if (state.select.country == "") maxi = 5;
      component = (
        <GhgStackedChart
          data={json}
          labelString="Gt CO2e"
          title="ARG: Argentina | AUS: Australia | BRA: Brazil | CAN: Canada | CHN: China | COL: Colombia | DEU: Germany | DNK: Denmark | ETH: Ethiopia | FIN: Finland | GBR: United Kingdom | GRC: Greece | IDN: Indonesia | IND: India | MEX: Mexico | NOR: Norway | NPL: Nepal | RUS: Russia | RWA: Rwanda | SWE: Sweden | TUR: Turkey | USA: United States of America | R_ASP: Rest of Asia and Pacific | R_CSA: Rest of Central and South America | RMECAS: Rest of Middle East Central Asia | R_NEU: Rest of Europe non EU28 | R_OEU: Rest of European Union | R_SSA: Rest of Sub-Saharan Africa"
          chartHeight={"38rem"}
          chartWidth={"100%"}
          max={maxi}
        />
      );
      break;

    case target_data.target_data[props.targetIndex].indicators[2]:
      // console.log("GHG indicator 2 : ", indicator);
      // console.log(
      //   "GhgDoughnut cumulativeDoughnutData: \n, ",
      //   cumulativeDoughnutData
      // );

      var targetValue = 0;
      var targetUnits = "Gt CO2 by 2050";

      if (state.select.country === "") {
        targetValue = 40;
        targetUnits = " Gt CO2 by 2050";
      }

      component = (
        // <div
        //   style={{
        //     paddingLeft: "2em",
        //     width: "100%",
        //   }}
        // >
          <GhgDoughnut
            targetUnits={targetUnits}
            totalGHG = {13}
            target={targetValue}
            data={cumulativeDoughnutData}
          />
        // </div>
      );
      break;

    case target_data.target_data[props.targetIndex].indicators[3]:
      // console.log(
      //   "GhgDoughnut agriculturalDoughnutData: \n, ",
      //   agriculturalDoughnutData
      // );

      var targetValue = 0;
      var targetUnits = "";

      if (state.select.country === "") {
        targetValue = 4;
        targetUnits = " GtCO2e in 2050";
      }

      component = (
        <GhgDoughnut
          targetUnits={targetUnits}
          target={targetValue}
          data={agriculturalDoughnutData}
        />
      );
      break;
  }

  return (
    <Suspense fallback={<Spinner />}>
      <div className="contenedor-selects">
        <ComboBoxCountrySelection
          defaultValue={
            state.select.country === "" ? countries[0] : state.select.country
          }
          data={countries}
          onChange={handleChange}
        />
        <ComboBoxPathway onChange={handleChange} data={pathways} />
        <ComboBoxTradeAdjusment
          data={tradeAdjustmentsOptions}
          onChange={handleChange}
        />
      </div>

      {laoder ? (
        <div class="loader"></div>
      ) : json.datasets.length === 0 ? (
        <div>No values for the given input data</div>
      ) : (
        <div className="graph-wrapper">{component}</div>
      )}
    </Suspense>
  );
};

export default GHG;
