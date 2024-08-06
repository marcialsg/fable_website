import React, { useState, useEffect } from "react";
import BarChartBig from "../../components/BarChartBig";
import ComboBoxTradeReporters from "../../components/ComboBoxTradeReporters";
import ComboBoxPathway from "../../components/Scenathon2021/ComboBoxPathway";
import ComboBoxProducts from "../../components/Scenathon2021/ComboBoxProducts";
import ConvertToCSV from "../../components/ConvertToCSV";
import ComboBoxTradeAdjusment from "../../components/Scenathon2021/ComboBoxTradeAdjusment";
import FooterTxt from "../../components/FooterTxt";
import TradeReportService from "../../services/Scenathon2021/TradeReportService";
import scenathonIterationsLabels from "../../data/scenathon_iterations_labels.json";

const SustainableExporter = (props) => {
  const getIterationsLabels = (iterations, scenathonId) => {
    const iterationsOptions =
      scenathonIterationsLabels[state.select.ScenathonYear]["scenathon_id"][
        scenathonId
      ]["iteration"];

    var iterationsLabels = [];

    iterations.forEach((element) => {
      for (const [key, value] of Object.entries(iterationsOptions)) {
        if (Number(element) === Number(key)) {
          iterationsLabels.push(<option value={key}>{value}</option>);
        }
      }
    });

    return iterationsLabels;
  };

  const getScenathonId = function (scenathon_label) {
    for (var i = 0; i < Object.keys(tradeAdjustments).length; i++) {
      const iterationsKey = Object.keys(tradeAdjustments)[i];
      const itObject = tradeAdjustments[iterationsKey];
      const itLabel = itObject.label;

      if (itLabel === scenathon_label) {
        return "" + iterationsKey;
      }
    }
  };

  const [laoder, setLoader] = useState(false);
  const [state, setState] = useState({
    select: {
      product: "abaca",
      GraficaType: "group",
      scenathon_id: props.year.scenathon_id,
      iteration: "1",
      ScenathonYear: props.year.year,
    },
  });

  const [products, setProducts] = useState([]);
  const [pathways, setPathways] = useState([]);
  const [tradeAdjustments, setTradeAdjustments] = useState([]);
  const [tradeAdjustmentsOptions, setTradeAdjustmentsOptions] = useState([]);

  const [json, setJson] = useState({
    importertChart: [],
    exporterChart: [],
    CSV: [],
    titleChart: "",
    Pathways: [],
    Products: [],
  });

  useEffect(() => {
    // In means that the year has been changed
    setLoader(true);
    if (state.select.ScenathonYear !== props.year.year) {
      state.select.scenathon_id = props.year.scenathon_id;
      state.select.ScenathonYear = props.year.year;
    }

    TradeReportService(state).then(function (value) {
      setJson(value);
      setProducts(value.Products);

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

      const iterationsLabels = getIterationsLabels(
        Object.keys(
          value.TradeAdjustments[state.select.scenathon_id]["iterations"]
        ),
        state.select.scenathon_id
      );
      setTradeAdjustmentsOptions(iterationsLabels);
      setLoader(false);
    });
  }, [state, props]);

  const handleChange = async (e) => {
    var product = state.select.product;
    var scenathon = state.select.scenathon_id;
    var iteration = state.select.iteration;
    var scenathonYear = state.select.ScenathonYear;

    switch (e.target.name) {
      case "scenathon_id": //pathway
        scenathon = getScenathonId(e.target.value);
        iteration = Object.keys(tradeAdjustments[scenathon]["iterations"])[0];
        setTradeAdjustmentsOptions([]);
        break;
      case "product":
        product = e.target.value;
        break;
      case "iteration":
        iteration = e.target.value;
        break;
    }

    setState({
      select: {
        scenathon_id: scenathon,
        iteration: iteration,
        ScenathonYear: scenathonYear,
        product: product,
      },
    });
  };

  const DownloadCSV = (e) => {
    ConvertToCSV(json.CSV);
  };
  var component = (
    <div className="ghg-plots-grid">
        <div>
          <BarChartBig
            data={json.importertChart}
            title=""
            labelString="Import quantity (unit 1000 tons)"
            displayTitle={false}
            chartHeight={"35em"}
            chartWidth={"32vw"}
          />
          <FooterTxt txt={`${state.select.product} net importers`} />
        </div>

        <div>
          <BarChartBig
            data={json.exporterChart}
            title=""
            labelString="Export quantity (unit 1000tons)"
            displayTitle={false}
            chartHeight={"35em"}
            chartWidth={"32vw"}
          />
          <FooterTxt txt={`${state.select.product} net exporters`} />
        </div>
      </div>
  );

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

      {laoder ? (
          <div class="loader"></div>
        ) : json.importertChart.length === 0 || json.exporterChart.length === 0 ? (
          <div>No values for the given input data</div>
        ) : (
          component
        )}
      
    </div>
  );
};
export default SustainableExporter;
