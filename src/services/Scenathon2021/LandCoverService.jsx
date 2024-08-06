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

  function LandCover(ChartCharacteristics, data) {
    this.data = data;
    this.type = ChartCharacteristics[0]["type"];
    this.label = ChartCharacteristics[0]["label"];
    this.borderColor = ChartCharacteristics[0]["borderColor"];
    this.backgroundColor = ChartCharacteristics[0]["backgroundColor"];

  }

  var labels = [];
  var calcPasture = [];
  var calcCropland = [];
  var calcForest = [];
  var calcNewForest = [];
  var calcOtherLand = [];
  var calcUrban = [];
  var dataSet = [];
  var pathways = [];

  pathways = response.pathways;    
  response = response.queryResponse;

  if (response.length !== 0) {

    response.forEach(item => {
      labels.push(item.Year);
      calcPasture.push(item.CalcPasture);
      calcCropland.push(item.CalcCropland);
      calcForest.push(item.CalcForest);
      calcNewForest.push(item.CalcNewForest);
      calcOtherLand.push(item.CalcOtherLand);
      calcUrban.push(item.CalcUrban);

    });

    var landCover = new LandCover(ChartCharacteristics["calcPasture"], calcPasture);
    dataSet.push(landCover);
    landCover = new LandCover(ChartCharacteristics["calcCropland"], calcCropland);
    dataSet.push(landCover);
    landCover = new LandCover(ChartCharacteristics["calcForest"], calcForest);
    dataSet.push(landCover);
    landCover = new LandCover(ChartCharacteristics["calcNewForest"], calcNewForest);
    dataSet.push(landCover);
    landCover = new LandCover(ChartCharacteristics["calcOtherLand"], calcOtherLand);
    dataSet.push(landCover);
    landCover = new LandCover(ChartCharacteristics["calcUrban"], calcUrban);
    dataSet.push(landCover);


    var data = {
      labels: labels,
      datasets: dataSet
    };

    return data = {
      Chart: data,
      CSV: response,
      Pathways: await getPathWaysList(pathways),
      TradeAdjustments: pathways
    };
  }
}

export default function getLandCover(props) {
  try {

    return fetch(`${process.env.REACT_APP_URL}landcover${JSON.stringify(props)}`).then(res => res.json()).then(responseApi);

  } catch (error) {
    console.error(error)
  }
}