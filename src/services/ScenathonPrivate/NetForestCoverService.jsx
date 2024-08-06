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


  function NetForesOne(ChartCharacteristics, data) {

    this.data = data;
    this.type = ChartCharacteristics[0]["type"];
    this.label = ChartCharacteristics[0]["label"];
    this.borderColor = ChartCharacteristics[0]["borderColor"];
    this.backgroundColor = ChartCharacteristics[0]["backgroundColor"];

  }

  function NetForesTarget(ChartCharacteristics, data) {
    this.data = data;
    this.type = ChartCharacteristics[0]["type"];
    this.label = ChartCharacteristics[0]["label"];
    this.fill = ChartCharacteristics[0]["fill"];
    this.radius = ChartCharacteristics[0]["radius"];
    this.borderColor = ChartCharacteristics[0]["borderColor"];
    this.backgroundColor = ChartCharacteristics[0]["backgroundColor"];
    this.pointBorderColor = ChartCharacteristics[0]["pointBorderColor"];
    this.pointBackgroundColor = ChartCharacteristics[0]["pointBackgroundColor"];
    this.pointHoverBackgroundColor = ChartCharacteristics[0]["pointHoverBackgroundColor"];
    this.pointHoverBorderColor = ChartCharacteristics[0]["pointHoverBorderColor"];
    this.yAxisID = ChartCharacteristics[0]["yAxisID"];

  }

  //NetForestChange
  var netForestChange = [];
  //Aforestation
  var aforestation = [];
  //ForestLoss
  var forestLoss = [];
  //GFW_deforestation_global
  var gfw_deforestation_global = [];
  //Forest_target
  var forest_target = [];

  var datasets = [];
  var labels = [];
  var pathways = [];
  var countries = [];

  countries = response.countries;    
  pathways = response.pathways;    
  response = response.queryResponse;

  if (response.length !== 0) {

    
    response.forEach(item => {

      
      console.log("NetforestCoverService item: ", item);

      if (!labels.includes(item.year)) {
        labels.push(item.year);
      }

      netForestChange.push(item.NetForestChange);
      aforestation.push(item.Aforestation);
      forestLoss.push(item.ForestLoss);

            // FALTAN ESTOS DOS :GFW_deforestation_global, Forest_target
      gfw_deforestation_global.push(item.GFW_deforestation_global);
      forest_target.push(item.Forest_target);
    });

    // console.log("labels: ", labels);

    //targets
    var netForest = new NetForesTarget(ChartCharacteristics["NetForestChange"], netForestChange);
    datasets.push(netForest);
    netForest = new NetForesTarget(ChartCharacteristics["GFW_deforestation_global"], gfw_deforestation_global);
    datasets.push(netForest);
    netForest = new NetForesTarget(ChartCharacteristics["Forest_target"], forest_target);
    datasets.push(netForest);

    netForest = new NetForesOne(ChartCharacteristics["Aforestation"], aforestation);
    datasets.push(netForest);
    netForest = new NetForesOne(ChartCharacteristics["ForestLoss"], forestLoss);
    datasets.push(netForest);


  }

  var data = {
    labels: labels,
    datasets: datasets,
    CSV: response,
    Pathways: await getPathWaysList(pathways),
    TradeAdjustments: pathways,
    Countries: countries
  };

  return data;

}


export default function getNetForest(props) {

  try {

    return fetch(`${process.env.REACT_APP_URL}privatewNetForesCoverChange${JSON.stringify(props)}`)
      .then(res => res.json()).then(responseApi);

  } catch (error) {
    console.error(error)
  }
}