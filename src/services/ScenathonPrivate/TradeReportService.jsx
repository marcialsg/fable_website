import countries_characteristics from '../../data/countries_characteristics.json';



const getPathWaysList = async (pathways) => {

  const pathWayList = [];

  for (var i = 0; i < Object.keys(pathways).length; i++) {

    const pathwayElement_index = Object.keys(pathways)[i];

    const pathwayElement = pathways[pathwayElement_index]["label"];

    pathWayList.push(pathwayElement);

  }

  return pathWayList;

};

const getProductsList = async (products, pathways) => {

  const productsList = products[Object.keys(pathways)[0]];
  return productsList;

};

const responseApi = async(response) => {


  function Sustainable(nameCountry, data) {

    let characteristic = countries_characteristics[nameCountry];

    if (characteristic !== undefined) {
      this.data = data;
      this.type = characteristic[0]["type"];
      this.label = characteristic[0]["label"];
      this.borderColor = characteristic[0]["borderColor"];
      this.backgroundColor = characteristic[0]["backgroundColor"];
    }

  }
  var countChartOne = 0;
  var countChartTwo = 0;
  var dataImport_quantity = [];
  var dataExport_quantity = [];
  var datasetsImport = [];
  var datasetsExport = [];
  var labels = [];
  var nameCounty = "";
  var i = 0;

  var titleChart = "";
  var countries = [];


  console.log("TradeReportService.jsx: response: ", response);

  countries = response.countries; 
  const pathways = response.pathways;   
  const products = response.products;    

  
  response = response.queryResponse;

  if (response.length !== 0) {

    titleChart = response.titleChart;
    nameCounty = response[0].name;

    response.forEach(item => {

      // console.log("TradeReportService response item: ", item);
      i++;

      if (!labels.includes(item.Year)) {
        labels.push(item.Year);
      }

      // console.log("TradeReportService.jsx: nameCounty: ", nameCounty);
      if (nameCounty !== item.name || i === response.length) {
        //  if (nameCounty !== item.name) {

        if (countChartOne !== dataImport_quantity.length) {
          if (i === response.length) { dataImport_quantity.push(item.Import_quantity); }

          var pais = new Sustainable(nameCounty, dataImport_quantity);

          //console.log("TradeReportService.jsx: pais: ", pais);

          datasetsImport.push(pais);
        }
        if (countChartTwo !== dataExport_quantity.length) {
          if (i === response.length) { dataExport_quantity.push(item.Export_quantity); }
          pais = new Sustainable(nameCounty, dataExport_quantity);
          datasetsExport.push(pais);
        }
        countChartOne = 0;
        countChartTwo = 0;
        nameCounty = item.name;
        dataImport_quantity = [];
        dataExport_quantity = [];
      }
      
      dataImport_quantity.push(item.Import_quantity);
      dataExport_quantity.push(item.Export_quantity);
      countChartOne = item.Import_quantity === "0.00" ? countChartOne + 1 : countChartOne;
      countChartTwo = item.Export_quantity === "0.00" ? countChartTwo + 1 : countChartTwo;

    });
  }

  var importerChart = {
    labels: labels,
    datasets: datasetsImport
  }

  var exporterChart = {
    labels: labels,
    datasets: datasetsExport
  }

  const responseData = {
    importerChart: importerChart,
    exporterChart: exporterChart,
    CSV: response,
    titleChart: titleChart,
    Pathways: await getPathWaysList(pathways),
    Products: await getProductsList(products, pathways),
    TradeAdjustments: pathways,
    Countries : countries
  }

  //console.log("TradeReportService.jsx: responseData: ", responseData);
  return responseData
}

export default function getSustainableImporter(props) {

  try {
    return fetch(`${process.env.REACT_APP_URL}privatetradeReport${JSON.stringify(props)}`)
      .then(res => res.json()).then(responseApi);
  } catch (error) {
    //console.error(error)
  }
}