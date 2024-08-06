import countries_characteristics from '../../data/countries_characteristics.json';


const responseApi = response => {


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

  const products = response.products;  
  const iterations = response.iterations;  


  response = response.queryResponse;

  console.log('TRADE REPORT');
  console.log(response);
  
  if (response.length !== 0) {

    nameCounty = response[0].name;
    console.log(nameCounty);
    response.forEach(item => {

      i++;
      if (!labels.includes(item.Year)) {
        labels.push(item.Year);
      }

      if (nameCounty !== item.name || i === response.length) {

        if (countChartOne !== dataImport_quantity.length) {

          if (i === response.length) { 
            dataImport_quantity.push(item.Import_quantity); 
          }

          var pais = new Sustainable(nameCounty, dataImport_quantity);
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


  // console.log('importerChart');
  // console.log(importerChart);

  // console.log('exporterChart');
  // console.log(exporterChart);

  return {
    importerChart: importerChart,
    exporterChart: exporterChart,
    CSV: response,
    Products: products,
    titleChart: "Trade Report",
    iterations: iterations
  }

}











export default function getSustainableImporter(props) {

  try {


    return fetch(`${process.env.REACT_APP_URL}tradeReport${JSON.stringify(props)}`)
      .then(res => res.json()).then(responseApi);



  } catch (error) {
    console.error(error)
  }
}