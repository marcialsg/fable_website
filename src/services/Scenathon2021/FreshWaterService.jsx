
import ChartCharacteristics from '../../data/ChartCharacteristics.json';


const getPathWaysList = async (pathways) => {

  const pathWayList = [];

  for (var i = 0; i < Object.keys(pathways).length; i++) {

    const pathwayElement_index = Object.keys(pathways)[i];

    const pathwayElement = pathways[pathwayElement_index]["label"];

    pathWayList.push(pathwayElement);

  }

  return pathWayList;

};

const responseApi = async(response) => {

  function FreshWaterUse(ChartCharacteristics, data) {
    this.data = data;
    this.type = ChartCharacteristics[0]["type"];
    this.label = ChartCharacteristics[0]["label"];
    this.borderColor = ChartCharacteristics[0]["borderColor"];
    this.backgroundColor = ChartCharacteristics[0]["backgroundColor"];
  }

  var labels = [];
  var blueWater = [];
  var dataSet = [];
  var pathways = [];

  console.log("FreshWaterUse response 1 : ", response);

  pathways = response.pathways;    
  response = response.queryResponse;

  if (response !== null) {

    console.log("FreshWaterUse response: ", response);
    response.forEach(item => {
      labels.push(item.Year);
      blueWater.push(item.BlueWater);

    });

    var freshWaterUse = new FreshWaterUse(ChartCharacteristics["cubic_metres"], blueWater);
    dataSet.push(freshWaterUse);

    var data = {
      labels: labels,
      datasets: dataSet
    };

  }

  data = {
    Chart: data,
    CSV: response,
    Pathways: await getPathWaysList(pathways),
    TradeAdjustments: pathways
  };


  return data

}


export default function getFreshWater(props) {

  try {
    
    return fetch(`${process.env.REACT_APP_URL}freshwater${JSON.stringify(props)}`)

      .then(res => res.json()).then(responseApi);


  } catch (error) {
    console.error(error)
  }
}