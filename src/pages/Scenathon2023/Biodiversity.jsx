import React, { Suspense, useState, useEffect } from "react";
import "../../css/index.css";
import StackBarPoint from "../../components/Scenathon2023/GhgStackedChart";
import StackBarPointNew from "../../components/Scenathon2023/BiodiversityChart";
import BiodiversityService from "../../services/Scenathon2023/BiodiversityService";
import Spinner from "../../components/Spinner";
import ComboBoxPathway from "../../components/Scenathon2023/ComboBoxPathway";
import ComboBoxTradeAdjusment from "../../components/Scenathon2021/ComboBoxTradeAdjusment";
import ComboBoxCountrySelection from "../../components/ScenathonPrivate/ComboBoxCountrySelection";

const Biodiversity = (props) => {
  var target_data = require("../../assets/2023_target_data.json");
  console.log("props: biodiversity ", props);
  const target = target_data.target_data[props.targetIndex].targetDomain;

  const indicator =
    target_data.target_data[props.targetIndex].indicators[props.indicatorIndex];

  const [pathways, setPathways] = useState([]);

  const [countries, setCountries] = useState([]);

  const [tradeAdjustmentsOptions, setTradeAdjustmentsOptions] = useState([]);

  const [json, setJson] = useState({ datasets: [], labels: [] });

  const [laoder, setLoader] = useState(false);

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

  const [scenathonData, setScenathonData] = useState({});

  useEffect(() => {
    setJson({ datasets: [], labels: [] });
    setLoader(true);
    console.log("prop iteration ", props.iteration);

    BiodiversityService(
      target.toLowerCase().replace(/\s/g, "_"),
      indicator.toLowerCase().replace(/\s/g, "_"),
      state
    ).then(function (value) {
      console.log("returned BiodiversityService value: ", value);

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
        console.log("iterationLabel: ", iterationLabel);
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
        console.log("aqui debe de llegar el tipo: ", state.select.type);
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
      console.log("iterationsLabels: ", iterationsLabels);
      setCountries(countryOptions);
      setPathways(pathwayOptions);
      setTradeAdjustmentsOptions(iterationsLabels.reverse());
      setLoader(false);
    });
  }, [state, props]);

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

        // console.log("before iterationKey: ", iterationKey);
        iteration = state.select.iteration;
        setTradeAdjustmentsOptions([]);
        break;

      case "iteration":
        console.log("etarget: ", e.target.value);
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
  console.log("etarget: ", state.select.iteration);
  var yAxisLabel = "1000 ha per 5 year";
  var maxi;

  console.log("Biodiversity indicator: ", indicator);
  switch (indicator) {
    case "Area of land where natural processes predominate":
      yAxisLabel = "Mha LNPP";
      if (state.select.country == "") maxi = 7000;
      var component = (
    
        <StackBarPoint
          data={json}
          labelString={yAxisLabel}
          chartHeight={"38em"}
          chartWidth={"100%"}
          min={0}
          max={maxi}
        />
    );
      break;
    case "Total area land inside protected areas or other effective conservation measures":
      yAxisLabel = "Mha Protected Areas and OECM ";
      if (state.select.country == "") maxi = 4000;
      var component = (
    
        <StackBarPoint
          data={json}
          labelString={yAxisLabel}
          chartHeight={"38em"}
          chartWidth={"100%"}
          min={0}
          max={maxi}
        />
    );
      break;
    case "Loss of forest":
      yAxisLabel = "Mha mature forest";
      if (state.select.country == "") maxi = 4500;
      var component = (
    
        <StackBarPoint
          data={json}
          labelString={yAxisLabel}
          chartHeight={"38em"}
          chartWidth={"100%"}
          min={0}
          max={maxi}
        />
    );
      break;
    case "Cropland area under agroecological practices":
      yAxisLabel = "MHa cropland";
      if (state.select.country == "") maxi = 2000;
      var component = (
    
        <StackBarPointNew
          data={json}
          labelString={yAxisLabel}
          chartHeight={"38em"}
          chartWidth={"100%"}
          min={0}
          max={maxi}
        />
    );
      break;
  }


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

export default Biodiversity;
