import countries_characteristics from '../../data/countries_characteristics.json';


const responseApi = async (response) =>{

  const getPathWaysList = async (pathways) => {

    const pathWayList = [];
  
    for (var i = 0; i < Object.keys(pathways).length; i++) {
  
      const pathwayElement_index = Object.keys(pathways)[i];
  
      const pathwayElement = pathways[pathwayElement_index]["label"];
  
      pathWayList.push(pathwayElement);
  
    }
  
    return pathWayList;
  
  };
  
  function FreshWaterTwo(nameCountry, data) {


    let characteristic = countries_characteristics[nameCountry];

    if (characteristic !== undefined) {
      this.data = data;
      this.type = characteristic[0]["type"];
      this.label = characteristic[0]["label"];
      this.borderColor = characteristic[0]["borderColor"];
      this.backgroundColor = characteristic[0]["backgroundColor"];
    }

  }

  var dataBlueWater = [];
  var count = 0;
  var i = 0;
  var freshWater = [];
  var labels = [];
  var pathways = [];
  var countries = [];

  countries = response.countries; 
  pathways = response.pathways;    
  response = response.queryResponse;

  var nameCounty = ""

  if (response.length !== 0) {

    nameCounty = response[0].name;
    response.forEach(item => {
      i++;
      if (!labels.includes(item.year)) {
        labels.push(item.year);
      }

      if (nameCounty !== item.Country || i === response.length) {
        if (count !== dataBlueWater.length) {

          if (i === response.length) { dataBlueWater.push(item.BlueWater); }
          var fresh = new FreshWaterTwo(nameCounty, dataBlueWater);
          freshWater.push(fresh);
        }
        nameCounty = item.Country;
        dataBlueWater = [];
        dataBlueWater.push(item.BlueWater);
      }

      dataBlueWater.push(item.BlueWater);
      count = item.BlueWater === "0.00" ? count + 1 : count;
    });


  }


  var dataChart = {
    labels: labels,
    datasets: freshWater,
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

export default function getFreshwaterBycountry(props) {
  try {

    return fetch(`${process.env.REACT_APP_URL}privateqFreshwaterBycountry${JSON.stringify(props)}`).then(res => res.json()).then(responseApi);

  } catch (error) {
    console.error(error)
  }
}