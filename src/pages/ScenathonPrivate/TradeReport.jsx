import React, { useState, useEffect } from "react";
import BarChartBig from "../../components/BarChartBig";
import ComboBoxPathway from "../../components/ScenathonPrivate/ComboBoxPathway";
import ComboBoxProducts from "../../components/ScenathonPrivate/ComboBoxProducts";
import ComboBoxTradeAdjusment from "../../components/ScenathonPrivate/ComboBoxTradeAdjusment";
import FooterTxt from "../../components/FooterTxt";
import TradeReportService from "../../services/ScenathonPrivate/TradeReportService";
import ComboBoxCountrySelection from "../../components/ScenathonPrivate/ComboBoxCountrySelection";


const SustainableExporter = (props) => {
  const getTradeAdjusments = function ({ iterations }) {
    const tradeAdjustmentsList = [];

    //console.log("TradeReport getTradeAdjusments: ", iterations);

    for (var i = 0; i < Object.keys(iterations).length; i++) {
      const iterationsLabel = Object.keys(iterations)[i];

      tradeAdjustmentsList.push(iterationsLabel);
    }

    //console.log("TradeReport tradeAdjustmentsList: ", tradeAdjustmentsList);

    return tradeAdjustmentsList;
  };

  const getScenathonId = function (scenathon_label) {
    //console.log(
    //   "TradeReport getScenathonId scenathon_label: ",
    //   scenathon_label
    // );

    for (var i = 0; i < Object.keys(tradeAdjustments).length; i++) {
      const iterationsKey = Object.keys(tradeAdjustments)[i];
      //console.log("TradeReport iterationsKey: ", iterationsKey);

      const itObject = tradeAdjustments[iterationsKey];
      //console.log("TradeReport itObject: ", itObject);

      const itLabel = itObject.label;
      //console.log("TradeReport itLabel: ", itLabel);

      if (itLabel === scenathon_label) {
        return "" + iterationsKey;
      }
    }
  };


  const [state, setState] = useState({
    select: {
      product: "abaca",
      GraficaType: "group",
      scenathon_id: props.year.scenathon_id,
      iteration: "1",
      ScenathonYear: props.year.year,
      country: ""
    },
  });
  const [countries, setCountries] = useState([]);
  const [products, setProducts] = useState([]);
  const [pathways, setPathways] = useState([]);
  const [tradeAdjustments, setTradeAdjustments] = useState([]);
  const [tradeAdjustmentsOptions, setTradeAdjustmentsOptions] = useState([]);

  const [json, setJson] = useState({
    importerChart: [],
    exporterChart: [],
    CSV: [],
    titleChart: "",
    Pathways: [],
    Products: [],
  });

  useEffect(() => {
    // In means that the year has been changed
    if (state.select.ScenathonYear !== props.year.year) {
      state.select.scenathon_id = props.year.scenathon_id;
      state.select.ScenathonYear = props.year.year;
    }

    TradeReportService(state).then(function (value) {

      console.log("TradeReportService value: ", value);

      const countryOptions = ["World", ...value.Countries]
      
      setCountries(countryOptions);

      setJson(value);
      setPathways(value.Pathways);

      //console.log("TradeReport value.Products: ", value.Products);

      setProducts(value.Products);
      setTradeAdjustments(value.TradeAdjustments);
      setTradeAdjustmentsOptions(
        getTradeAdjusments(value.TradeAdjustments[state.select.scenathon_id])
      );
    });
  }, [state, props]);

  const handleChange = async (e) => {
    // SELECT DISTINCT "iteration" FROM nettrade2022 WHERE "Product" = 'soyabean' AND "scenathon_id"= 8

    // RETURNS 1,4,2

    // That means, that this query will not work:

    // tradeReport COMBINATIONS SELECT:  {
    // 	scenathon_id: '8',
    // 	iteration: '1',
    // 	ScenathonYear: '2021',
    // 	product: 'soyabean'
    //   }
    //   QUERY:  SELECT "name", "Year", ROUND("import_quantity"::numeric,2) as "Import_quantity", ROUND("export_quantity"::numeric,2) as "Export_quantity" FROM nettrade2022 WHERE "Product"=$1
    //   AND "iteration"=$2 AND "scenathon_id"=$3 ORDER BY "name","Year" ASC
    //   ARGUMENTS:  [ 'soyabean', '3', '8' ]

    //TODO: CONSIDER TABLE nettrade2022 IN scenathon_cache.

    // FIX THIS: GET CORRECT ARGUMENTS USING THIS CONSTRAINTS

    var product = state.select.product;
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
      case "scenathon_id": //pathway
        scenathon = getScenathonId(e.target.value);
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
        country: country
      },
    });
  };

  return (
    <div>
      <div className="contenedor-selects">
        <div style={{ marginRight: "auto" }}></div>
        <ComboBoxCountrySelection data={countries} onChange={handleChange} />
        <ComboBoxPathway onChange={handleChange} data={pathways} />
        <ComboBoxTradeAdjusment
          data={tradeAdjustmentsOptions}
          onChange={handleChange}
        />

        <ComboBoxProducts onChange={handleChange} data={products} />
        
      </div>
      <div
        className="graph"
        style={{
          display: "flex",
          flexDirection: "column",
          height: "35em",
          width: "65vw",
          margin: "auto",
        }}
      >
        <div
          className="graph-wrapper"
          style={{ height: "35em", width: "65vw" }}
        >
          <div
            style={{
              width: "32vw",
              margin: "1em",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ textAlign: "left", height: "35em", width: "100%" }}>
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
          </div>
          <div
            style={{
              width: "32vw",
              margin: "1em",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ textAlign: "left", height: "35em", width: "100%" }}>
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
      </div>
    </div>
  );
};
export default SustainableExporter;
