import React, { useState, useEffect } from "react";
import BarChartBig from "../../components/BarChartBig";
import ComboBoxTradeReporters from "../../components/ComboBoxTradeReporters";
import ComboBoxProducts from "../../components/Scenathon2021/ComboBoxProducts";
import ConvertToCSV from "../../components/ConvertToCSV";
import FooterTxt from "../../components/FooterTxt";
import TradeReportService from "../../services/Scenathon2023/TradeReportService";
import scenathonIterationsLabels from "../../data/scenathon_iterations_labels.json";
import ComboBoxPathway from "../../components/Scenathon2023/ComboBoxPathway";
import ComboBoxTradeAdjusment from "../../components/Scenathon2021/ComboBoxTradeAdjusment";

import "../../css/index.css";
const SustainableExporter = (props) => {
  console.log("SustainableExporter props: ", props);

  const [tradeAdjustmentsOptions, setTradeAdjustmentsOptions] = useState([]);

  const [state, setState] = useState({
    select: {
      product: "abaca",
      Year: "2030",
      scenathon_id: "16",
      PathwayId: "1",
      iteration: props.iteration,
      ScenathonYear: "2023",
      country: "",
      type: props.type,
      max: 0,
    },
  });

  const [countries, setCountries] = useState([]);
  const [products, setProducts] = useState([]);
  const [pathways, setPathways] = useState([]);
  const [scenathonData, setScenathonData] = useState({});
  const [laoder, setLoader] = useState(false);

  const [json, setJson] = useState({
    importertChart: [],
    exporterChart: [],
    CSV: [],
    titleChart: "",
    Pathways: [],
    Products: [],
  });

  useEffect(() => {
    setLoader(true);

    TradeReportService(state).then(function (value) {
      var maxTemp = 0;
      var maxvalueyaxis = 0;
      var arr = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
      var arr2 = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];

      for (let j = 0; j < value.exporterChart.datasets.length; j++) {
        for (let k = 0; k < value.exporterChart.datasets[j].data.length; k++) {
          arr[k] = arr[k] + parseFloat(value.exporterChart.datasets[j].data[k]);
        }
      }
      maxTemp = Math.max.apply(null, arr);

      if (maxTemp > maxvalueyaxis) {
        maxvalueyaxis = maxTemp;
      }
      for (let j = 0; j < value.importertChart.datasets.length; j++) {
        for (let k = 0; k < value.importertChart.datasets[j].data.length; k++) {
          arr2[k] =
            arr2[k] + parseFloat(value.importertChart.datasets[j].data[k]);
        }
      }
      maxTemp = Math.max.apply(null, arr2);

      if (maxTemp > maxvalueyaxis) {
        maxvalueyaxis = maxTemp;
      }

      var valorMAXInt = Math.ceil(maxvalueyaxis);
      if (valorMAXInt / 10 < 1) {
        valorMAXInt = Math.ceil(valorMAXInt / 10) * 10;
      } else if (valorMAXInt / 10 > 1 && valorMAXInt / 10 < 10) {
        valorMAXInt = Math.ceil(valorMAXInt / 10) * 10;
      } else if (valorMAXInt / 10 > 10 && valorMAXInt / 10 < 100) {
        valorMAXInt = Math.ceil(valorMAXInt / 100) * 100;
      } else if (valorMAXInt / 10 > 100 && valorMAXInt / 10 < 1000) {
        valorMAXInt = Math.ceil(valorMAXInt / 1000) * 1000;
      } else if (valorMAXInt / 10 > 1000 && valorMAXInt / 10 < 10000) {
        valorMAXInt = Math.ceil(valorMAXInt / 10000) * 10000;
      }
      state.select.max = valorMAXInt;
      console.log("max value: ", valorMAXInt);

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
        var tempCountries=[], tempRest =[];
          for (let i = 0; i < iterationValue.countries.length; i++) {
            if(iterationValue.countries[i].includes("Rest"))
            {
              tempRest.push(iterationValue.countries[i]);
            }else{
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

      setProducts(value.Products[state.select.scenathon_id]);
      setCountries(countryOptions);
      setPathways(pathwayOptions);
      setTradeAdjustmentsOptions(iterationsLabels.reverse());
      setLoader(false);
    });
  }, [state, props]);

  const handleChange = async (e) => {
    var product = state.select.product;
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
        // iteration = iterationKey;
        setTradeAdjustmentsOptions([]);
        // break;
        iteration = state.select.iteration;
        break;
      case "iteration":
        iteration = e.target.value;
        country = "";
        setCountries([]);

        break;
      case "product":
        product = e.target.value;
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

  const DownloadCSV = (e) => {
    ConvertToCSV(json.CSV);
  };

  return (
    <div>
      <div className="contenedor-selects">
        <ComboBoxPathway onChange={handleChange} data={pathways} />
        <ComboBoxTradeAdjusment
          data={tradeAdjustmentsOptions}
          onChange={handleChange}
        />

        <ComboBoxProducts onChange={handleChange} data={products} />
        <ComboBoxTradeReporters onClick={DownloadCSV} />
      </div>

      <div className="graph-wrapper">
        <div className="grid-containerTrade">
          <div>
            <BarChartBig
              data={json.importertChart}
              title=""
              labelString="1000 tons"
              displayTitle={false}
              chartHeight={"35rem"}
              chartWidth={"100%"}
              max={state.select.max}
            />
            <FooterTxt txt={`${state.select.product} net importers`} />
          </div>
          <div>
            <BarChartBig
              data={json.exporterChart}
              title=""
              labelString="1000 tons"
              displayTitle={false}
              chartHeight={"35rem"}
              chartWidth={"100%"}
              max={state.select.max}
            />
            <FooterTxt txt={`${state.select.product} net exporters`} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default SustainableExporter;
