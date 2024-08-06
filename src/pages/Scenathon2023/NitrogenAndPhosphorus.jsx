import React, { Suspense, useState, useEffect } from "react";
import "../../css/index.css";
import VerticalBarChart from "../../components/Scenathon2023/VerticalBarChart";
import NitrogenAndPhosphorusService from "../../services/Scenathon2023/NitrogenAndPhosphorusService";

import Spinner from "../../components/Spinner";

import ComboBoxPathway from "../../components/Scenathon2023/ComboBoxPathway";
import ComboBoxTradeAdjusment from "../../components/Scenathon2021/ComboBoxTradeAdjusment";

import ComboBoxCountrySelection from "../../components/ScenathonPrivate/ComboBoxCountrySelection";
import scenathonIterationsLabels from "../../data/scenathon_iterations_labels.json";

const NitrogenAndPhosphorus = (props) => {
  var target_data = require("../../assets/2023_target_data.json");

  console.log("NitrogenAndPhosphorus target_data: ", target_data);
  const target = target_data.target_data[props.targetIndex].targetDomain;
  console.log("NitrogenAndPhosphorus target: ", target);

  const indicator =
    target_data.target_data[props.targetIndex].indicators[props.indicatorIndex];

  let component = null;

  const [pathways, setPathways] = useState([]);

  const [countries, setCountries] = useState([]);

  const [tradeAdjustments, setTradeAdjustments] = useState({});

  const [tradeAdjustmentsOptions, setTradeAdjustmentsOptions] = useState([]);

  const [laoder, setLoader] = useState(false);

  const [scenathonData, setScenathonData] = useState({});

  const [state, setState] = useState({
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
    setLoader(true);

    NitrogenAndPhosphorusService(
      target.toLowerCase().replace(/\s/g, "_"),
      indicator.toLowerCase().replace(/\s/g, "_"),
      state
    ).then(function (value) {
      console.log("returned NitrogenAndPhosphorusService value: ", value);

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

  var labelText = "1000 tons";
  var maxi;

  if (indicator == target_data.target_data[props.targetIndex].indicators[1]) {
    if (state.select.country == "") maxi = 50;
  } else {
    if (state.select.country == "") maxi = 300;
  }

  component = (
    <VerticalBarChart
      data={json}
      labelString={labelText}
      chartHeight={"38rem"}
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
        // scenathonData[pathway_id].iteration[key].iterationLabel.includes("before")
        // );

        // console.log("before iterationKey: ", iterationKey);
        iteration = state.select.iteration;
        setTradeAdjustmentsOptions([]);
        break;

      case "iteration":
        iteration = e.target.value;
        country = "";
        setCountries([]);

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

export default NitrogenAndPhosphorus;
