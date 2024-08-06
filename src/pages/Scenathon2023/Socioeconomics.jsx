import React, { Suspense, useState, useEffect } from "react";
import MixedChartBig from "../../components/Scenathon2021/MixedChartBig";
import SocioeconomicsService from "../../services/Scenathon2023/SocioeconomicsService";
import SocioeconomicsGetProductsService from "../../services/Scenathon2023/SocioeconomicsGetProductsService";
import Spinner from "../../components/Spinner";
import ConvertToCSV from "../../components/ConvertToCSV";
import ComboBoxCountrySelection from "../../components/ScenathonPrivate/ComboBoxCountrySelection";
import scenathonIterationsLabels from "../../data/scenathon_iterations_labels.json";
import ComboBoxProducts from "../../components/Scenathon2021/ComboBoxProducts";
import "../../css/index.css";

import ComboBoxPathway from "../../components/Scenathon2023/ComboBoxPathway";
import ComboBoxTradeAdjusment from "../../components/Scenathon2021/ComboBoxTradeAdjusment";

const Socioeconomics = (props) => {
  var target_data = require("../../assets/2023_target_data.json");

  const target = target_data.target_data[props.targetIndex].targetDomain;

  var indicator =
    target_data.target_data[props.targetIndex].indicators[props.indicatorIndex];

  const [mIndicator, setIndicator] = useState(indicator);

  const [countries, setCountries] = useState([]);
  const [products, setProducts] = useState([]);
  const [pathways, setPathways] = useState([]);
  const [tradeAdjustments, setTradeAdjustments] = useState({});
  const [tradeAdjustmentsOptions, setTradeAdjustmentsOptions] = useState([]);
  const [laoder, setLoader] = useState(false);
  const [scenathonData, setScenathonData] = useState({});

  const [state, setState] = useState({
    select: {
      Year: "2030",
      scenathon_id: "16",
      PathwayId: "1",
      iteration: props.year.iteration,
      ScenathonYear: "2023",
      country: "",
      product: "",
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
    if (indicator !== mIndicator) {
      setJson({
        labels: [],
        datasets: [],
        CSV: [],
        pathways: [],
        products: [],
      });
    }

    setCountries([]);

    setLoader(true);

    SocioeconomicsService(
      target.toLowerCase().replace(/\s/g, "_"),
      indicator.toLowerCase().replace(/\s/g, "_"),
      state
    ).then(function (value) {
      console.log("SocioeconomicsService value: ", value);

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

      SocioeconomicsGetProductsService(
        target.toLowerCase().replace(/\s/g, "_"),
        state
      ).then(function (value) {
        console.log("returned SocioeconomicsGetProductsService value: ", value);

        setProducts(["All Products", ...value.products]);
        setLoader(false);
      });
    });
  }, [state, props]);

  let component = null;

  let label = "";
  var maxi;

  switch (indicator) {
    case target_data.target_data[props.targetIndex].indicators[0]:
      console.log(
        "socioeconomicsIndicators: " +
          target_data.target_data[props.targetIndex].indicators[0]
      );
      label = "1000 USD";
      if (state.select.country == "" && state.select.product == "") {
        maxi = 1400000000;
      }

      break;

    case target_data.target_data[props.targetIndex].indicators[1]:
      label = "Million FTE";
      maxi = 160000;
      break;

    case target_data.target_data[props.targetIndex].indicators[2]:
      label = "Million FTE";
      if (state.select.country == "" && state.select.product == "")
        maxi = 200000;
      break;
  }

  component = (
      <MixedChartBig
        data={json}
        labelString={label}
        chartHeight={"38em"}
        chartWidth={"100%"}
        max={maxi}
      />
  );

  const handleChange = async (e) => {
    var product = state.select.product;
    var country = state.select.country;
    var scenathonYear = state.select.ScenathonYear;
    var iteration = state.select.iteration;
    var pathway_id = state.select.PathwayId;
    var type = state.select.type;

    switch (e.target.name) {
      case "product":
        product = e.target.value;

        if (product == "All Products") {
          product = "";
        }

        break;

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
        product: product,
        type: type,
      },
    });
  };

  let filters = null;
  if (indicator != "Employment in Agriculture: Eat Food Groups") {
    filters = (
      <div className="contenedor-selects">
        <ComboBoxCountrySelection
          defaultValue={
            state.select.country === "" ? countries[0] : state.select.country
          }
          data={countries}
          onChange={handleChange}
        />
        <ComboBoxProducts onChange={handleChange} data={products} />
        <ComboBoxPathway onChange={handleChange} data={pathways} />
        <ComboBoxTradeAdjusment
          data={tradeAdjustmentsOptions}
          onChange={handleChange}
        />
      </div>
    );
  } else {
    filters = (
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
    );
  }

  return (
    
        <div>
          {filters}
          <br />
          {laoder ? (
            <div class="loader"></div>
          ) : json.datasets.length === 0 ? (
            <div>No values for the given input data</div>
          ) : (
            <div className="graph-wrapper">
            {component}
            </div>
          )}
        </div>
  );
};

export default Socioeconomics;
