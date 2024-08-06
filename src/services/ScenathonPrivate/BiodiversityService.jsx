
import countries_characteristics from '../../data/countries_characteristics.json';
require('dotenv').config();



const getPathWaysList = async (pathways) => {

  const pathWayList = [];
  const iterationList = [];

  for (var i = 0; i < Object.keys(pathways).length; i++) {

    const pathwayElement_index = Object.keys(pathways)[i];

    const pathwayElement = pathways[pathwayElement_index]["label"];

    pathWayList.push(pathwayElement);

  }

  return pathWayList;

};


const responseApi = async (response) => {

  function Biodiversity(nameCountry, data) {

    let characteristic = countries_characteristics[nameCountry];

    if (characteristic !== undefined) {
      this.data = data;
      this.type = characteristic[0]["type"];
      this.label = characteristic[0]["label"];
      this.borderColor = characteristic[0]["borderColor"];
      this.backgroundColor = characteristic[0]["backgroundColor"];
    }

  }
  var count = 0;
  var i = 0;
  var dataBiodiversity_land = [];
  var biodiversities = [];
  var labels = [];
  var nameCountry = "";
  var pathways = [];
  var countries = [];

  countries = response.countries;    
  pathways = response.pathways;    
  response = response.queryResponse;
  
  if (response.length !== 0) {

    nameCountry = response[0].name;
    response.forEach(item => {
      i++;

      if (!labels.includes(item.year)) {
        labels.push(item.year);
      }

      if (nameCountry !== item.Country || i === response.length) {


        if (count !== dataBiodiversity_land.length) {

          if (i === response.length) { dataBiodiversity_land.push(item.Protected_land); }
          var biodiversity = new Biodiversity(nameCountry, dataBiodiversity_land);
          biodiversities.push(biodiversity);
        }
        count = 0;
        nameCountry = item.Country;
        dataBiodiversity_land = [];

      }
      dataBiodiversity_land.push(item.Protected_land);

      count = item.Protected_land === 0 || item.Protected_land === "0.00" ? count + 1 : count;

    });


  }

  var dataChart = {
    labels: labels,
    datasets: biodiversities
  }

  var data = {
    Chart: dataChart,
    CSV: response,
    Pathways: await getPathWaysList(pathways),
    TradeAdjustments: pathways,
    Countries : countries
  };


  return data;
}
  
export default function getBiodiversity(props) {

  try {

    return fetch(`${process.env.REACT_APP_URL}privatebiodiversityByCountry${JSON.stringify(props)}`).then(res => res.json()).then(responseApi);

  } catch (error) {
    console.error(error)
  }
}