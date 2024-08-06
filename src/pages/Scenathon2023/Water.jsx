import React, { Suspense, useState, useEffect } from "react";
import "../../css/index.css";
import VerticalBarChart from "../../components/Scenathon2023/VerticalBarChart";
import WaterService from "../../services/Scenathon2023/WaterService";
import Spinner from "../../components/Spinner";
import ComboBoxPathway from "../../components/Scenathon2023/ComboBoxPathway";
import ComboBoxTradeAdjusment from "../../components/Scenathon2021/ComboBoxTradeAdjusment";
import ComboBoxCountrySelection from "../../components/ScenathonPrivate/ComboBoxCountrySelection";

const Water = (props) => {
  var target_data = require("../../assets/2023_target_data.json");
  const target = target_data.target_data[props.targetIndex].targetDomain;

  const indicator =
    target_data.target_data[props.targetIndex].indicators[props.indicatorIndex];

  let component = null;

  const [scenathonData, setScenathonData] = useState({});
  const [pathways, setPathways] = useState([]);
  const [countries, setCountries] = useState([]);
  const [tradeAdjustmentsOptions, setTradeAdjustmentsOptions] = useState([]);
  const [laoder, setLoader] = useState(false);

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
    labels: [],
    datasets: [],
    CSV: [],
    Pathways: [],
  });

  useEffect(() => {
    setLoader(true);
    WaterService(
      target.toLowerCase().replace(/\s/g, "_"),
      indicator.toLowerCase().replace(/\s/g, "_"),
      state
    ).then(function (value) {
      // console.log("returned WaterService value: ", value);

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
      setLoader(false);
    });
  }, [state, props]);

  var labelText = "";
  var maxi;
  var title = ""
  switch (indicator) {
    case target_data.target_data[props.targetIndex].indicators[0]:
      labelText = "km3";
      if (state.select.country == "") {
        maxi = 2500;
      }
      break;

    case target_data.target_data[props.targetIndex].indicators[1]:
      labelText = "Million m3";
      if (state.select.country == "") {
        maxi = 1400;
      }
      title="ARG: Argentina | AUS: Australia | BRA: Brazil | CAN: Canada | CHN: China | COL: Colombia | DEU: Germany | DNK: Denmark | ETH: Ethiopia | FIN: Finland | GBR: United Kingdom | GRC: Greece | IDN: Indonesia | IND: India | MEX: Mexico | NOR: Norway | NPL: Nepal | RUS: Russia | RWA: Rwanda | SWE: Sweden | TUR: Turkey | USA: United States of America | R_ASP: Rest of Asia and Pacific | R_CSA: Rest of Central and South America | RMECAS: Rest of Middle East Central Asia | R_NEU: Rest of Europe non EU28 | R_OEU: Rest of European Union | R_SSA: Rest of Sub-Saharan Africa"
      break;
  }

  component = (
    <VerticalBarChart
      data={json}
      labelString={labelText}
      title = {title}
      chartHeight={"38em"}
      chartWidth={"100%"}
      max={maxi}
    />
  );

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
        // country = "";
        // setCountries([]);

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

  console.log("Water countries.length : ", countries.length + "");

  return (
    <div>
      <Suspense fallback={<Spinner />}>
        <div>
          <div className="contenedor-selects">
            <ComboBoxCountrySelection
              defaultValue={
                state.select.country === ""
                  ? countries[0]
                  : state.select.country
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
        </div>
      </Suspense>
    </div>
  );
};

export default Water;
