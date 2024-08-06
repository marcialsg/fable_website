import ChartCharacteristics from "../../data/ChartCharacteristics.json";

const getPathWaysList = async (pathways) => {
  const pathWayList = [];

  for (var i = 0; i < Object.keys(pathways).length; i++) {
    const pathwayElement_index = Object.keys(pathways)[i];

    const pathwayElement = pathways[pathwayElement_index]["label"];

    pathWayList.push(pathwayElement);
  }

  return pathWayList;
};

const responseApi = async (response) => {
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
  var countries = [];

  countries = response.countries;
  pathways = response.pathways;
  response = response.queryResponse;

  if (response !== null) {
    response.forEach((item) => {
      labels.push(item.year);
      blueWater.push(item.BlueWater);
    });

    var freshWaterUse = new FreshWaterUse(
      ChartCharacteristics["cubic_metres"],
      blueWater
    );
    dataSet.push(freshWaterUse);

    var dataChart = {
      labels: labels,
      datasets: dataSet,
    };
  }

  var data = {
    Chart: dataChart,
    CSV: response,
    Pathways: await getPathWaysList(pathways),
    TradeAdjustments: pathways,
    Countries: countries,
  };

  console.log("FreshWaterService: data: ", data);
  return data;
};

export default function getFreshWater(props) {
  try {
    return fetch(
      `${process.env.REACT_APP_URL}privatefreshwater${JSON.stringify(props)}`
    )
      .then((res) => res.json())
      .then(responseApi);
  } catch (error) {
    console.error(error);
  }
}
