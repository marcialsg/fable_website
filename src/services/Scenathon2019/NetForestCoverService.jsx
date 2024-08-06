import ChartCharacteristics from '../../data/ChartCharacteristics.json';
const responseApi = response => {

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

  var datasets = [];
  var labels = [];

  console.log('NetForestCoverService:\n', JSON.stringify(response));
  response = response.queryResponse;

  if (response.length !== 0) {

    response.forEach(item => {
      if (!labels.includes(item.year)) {
        labels.push(item.year);
      }
      gfw_deforestation_global.push(item.GFW_deforestation_global);
      netForestChange.push(item.NetForestChange);

      aforestation.push(item.Aforestation);
      forestLoss.push(item.ForestLoss);

    });
    
    //targets
    var netForest = new NetForesTarget(ChartCharacteristics["NetForestChange"], netForestChange);
    datasets.push(netForest);

       // iterate over gfw_deforestation_global and if the value is 0, then replace it with null
       for (var i = 0; i < gfw_deforestation_global.length; i++) {
        if (Number(gfw_deforestation_global[i]) === 0 && i !== 0) {
          gfw_deforestation_global[i] = null;
        }
      }
    
      

    netForest = new NetForesTarget(ChartCharacteristics["GFW_deforestation_global"], gfw_deforestation_global);
    datasets.push(netForest);
    netForest = new NetForesOne(ChartCharacteristics["Aforestation"], aforestation);
    datasets.push(netForest);
    netForest = new NetForesOne(ChartCharacteristics["ForestLoss"], forestLoss);
    datasets.push(netForest);

    var data = {
      labels: labels,
      datasets: datasets,
      CSV: response
    };

  }

  return data;

}


export default function getNetForest(url, props) {

  try {

    return fetch(`${process.env.REACT_APP_URL}${url}${JSON.stringify(props)}`)
      .then(res => res.json()).then(responseApi);

  } catch (error) {
    console.error(error)
  }
}