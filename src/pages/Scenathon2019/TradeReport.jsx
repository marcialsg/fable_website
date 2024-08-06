import React, { useState, useEffect } from "react";
import BarChartBig from "../../components/BarChartBig";
import ComboBoxTradeReporters from "../../components/ComboBoxTradeReporters";
import ComboBoxPathway from "../../components/Scenathon2021/ComboBoxPathway";
import ComboBoxProducts from "../../components/Scenathon2021/ComboBoxProducts";
import ConvertToCSV from "../../components/ConvertToCSV";
import ComboBoxTradeAdjusment from "../../components/Scenathon2019/ComboBoxTradeAdjusment";
import FooterTxt from "../../components/FooterTxt";
import TradeReportService from "../../services/Scenathon2019/TradeReportService";
import ComboBoxYear from "../../components/ComboBoxYear";
import scenathonIterationsLabels from "../../data/scenathon_iterations_labels.json";

const SustainableExporter = () => {
  const getIterationsLabels = (iterations, scenathonId) => {
    const iterationsOptions =
      scenathonIterationsLabels[state.select.ScenathonYear]["scenathon_id"][
        scenathonId
      ]["iteration"];

    var iterationsLabels = [];

    iterations.forEach((element) => {
      for (const [key, value] of Object.entries(iterationsOptions)) {
        if (element === key) {
          iterationsLabels.push(<option value={key}>{value}</option>);
        }
      }
    });

    return iterationsLabels;
  };

  const [state, setState] = useState({
    select: {
      product: "abaca",
      iteration: "5",
      ScenathonYear: "2019",
    },
  });

  const [products, setProducts] = useState([]);
  const [iterations, setIterations] = useState([]);

  const [json, setJson] = useState({
    importerChart: [],
    exporterChart: [],
    CSV: [],
    titleChart: "",
    Products: [],
    iterations: [],
  });

  useEffect(() => {
    TradeReportService(state).then(function (value) {
      console.log("TradeReport useEffect: ", value);
      setJson(value);
      setProducts(value.Products);

      const iterationsLabels = getIterationsLabels(value.iterations, 0);

      setIterations(iterationsLabels);
    });
  }, [state]);

  const handleChange = async (e) => {
    var local_product = state.select.product;
    var local_scenathon_id = state.select.scenathon_id;
    var local_iteration = state.select.iteration;

    switch (e.target.name) {
      case "iteration":
        local_iteration = e.target.value;
        break;

      case "product":
        local_product = e.target.value;
        break;
    }

    console.log(
      "handleChange: ",
      e.target.name,
      local_iteration,
      local_scenathon_id
    );

    setState({
      select: {
        product: local_product,
        iteration: local_iteration,
        ScenathonYear: "2019",
      },
    });
  };

  const DownloadCSV = (e) => {
    ConvertToCSV(json.CSV);
  };

  return (
    <div>
      <div className="contenedor-selects">


        <ComboBoxTradeAdjusment onChange={handleChange} data={iterations} />
        <ComboBoxProducts onChange={handleChange} data={products} />
        <ComboBoxTradeReporters onClick={DownloadCSV} />
      </div>

      <div className="ghg-plots-grid">
        <div>
          <BarChartBig
            data={json.importerChart}
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
    </div>
  );
};
export default SustainableExporter;
