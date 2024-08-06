import countries_characteristics from '../../data/countries_characteristics.json';


const getPathWaysList = async (pathways) => {

  const pathWayList = [];
  const iterationList = [];

  for (var i = 0; i < Object.keys(pathways).length; i++) {

    const pathwayElement_index = Object.keys(pathways)[i];

    const pathwayElement = pathways[pathwayElement_index]["label"];

    pathWayList.push(pathwayElement);

    // const iterationElements = pathways[pathwayElement_index]["iterations"];

    // console.log('iterationElement: ', iterationElement);

    // for(var j = 0; j < Object.keys(iterationElement).length; j++) {

    //     const iteration = Object.keys(iterationElement)[j];
    //     iterationList.push(iteration);
    // }


  }

  return pathWayList;

};


const responseApi = async (response) => {


  function NetForest(nameCountry, data) {
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
  var NetForestChange = [];
  var datasetAux = [];
  var labels = [];
  var pathways = [];
  var countries = [];
  var nameCounty = "";
  var i = 0;

  console.log("NetForestTwoService response: \n", response);
  countries = response.countries;
  pathways = response.pathways;
  response = response.queryResponse;

  if (response.length !== 0) {



    nameCounty = response[0].name;

    response.forEach(item => {
      i++;
      if (!labels.includes(item.year)) {
        labels.push(item.year);
      }

      if (nameCounty !== item.Country || i === response.length) {

        if (count !== NetForestChange.length) {
          if (i === response.length) { NetForestChange.push(item.NetForestChange); }
          var netForest = new NetForest(nameCounty, NetForestChange);
          datasetAux.push(netForest);
        }

        count = 0;
        nameCounty = item.Country;
        NetForestChange = [];

      }
      NetForestChange.push(item.NetForestChange);
      count = item.NetForestChange === "0.00" || item.NetForestChange === 0 ? count + 1 : count;

    });

  }

  var dataChart = {
    labels: labels,
    datasets: datasetAux
  }
  var data = {
    Chart: dataChart,
    CSV: response,
    Pathways: await getPathWaysList(pathways),
    Countries: countries,
    TradeAdjustments: pathways
  };


  console.log("NetForestTwoService data: \n", data);
  return data;

}

export default function getNetForesTwo(props) {
  try {

    return fetch(`${process.env.REACT_APP_URL}privateNforestbycountry${JSON.stringify(props)}`).then(res => res.json()).then(responseApi);

  } catch (error) {
    console.error(error)
  }
}