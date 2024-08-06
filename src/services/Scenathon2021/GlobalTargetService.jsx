
import ChartCharacteristics from '../../data/ChartCharacteristics.json';


const responseApi = async(response) => {

  var labels = [];

  //--------------target 1-------------------

  //NetForestChange
  var netForestChange = [];
  //forest target
  var forest_target = [];
  //datasets
  var datasetsTargetOne = [];

  //-----------------target 2---------------//

  var protected_land = [];
  var protected_landTarget = [];
  var datasetsTargetTwo = [];

  //-----------------target 3---------------//

  var biodiversity_land = [];
  var target_biodiversity = [];
  var datasetsTargetThree = [];
  var pathways = [];

  function Global(ChartCharacteristics, data) {

    this.data = data;
    this.type = ChartCharacteristics[0]["type"];
    this.label = ChartCharacteristics[0]["label"];
    this.borderColor = ChartCharacteristics[0]["borderColor"];
    this.backgroundColor = ChartCharacteristics[0]["backgroundColor"];

  }

  function GlobalTarget(ChartCharacteristics, data) {

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
  
  // console.log("GlobalTargetService response: \n", JSON.stringify(response));
    
  if (response.length !== 0) {

    
    pathways = response.pathways;
    response = response.queryResponse;


    response.forEach(item => {
      if (!labels.includes(item.Year)) {
        labels.push(item.Year);
      }

      //target One
      netForestChange.push(item.NetForestChange);
      forest_target.push(item.ForestTarget);

      //targetTwo
      protected_land.push(item.Protected_Land);
      protected_landTarget.push(item.Protected_land_target);

      //target3
      biodiversity_land.push(item.Biodiversity_Land);
      target_biodiversity.push(item.Target_Biodiversity);


    });

    //target One
    var global = new GlobalTarget(ChartCharacteristics["Forest_target"], forest_target);
    datasetsTargetOne.push(global);

    global = new Global(ChartCharacteristics["NetForestChangeBar"], netForestChange);
    datasetsTargetOne.push(global);

    //target Two
    global = new GlobalTarget(ChartCharacteristics["protected_land_target"], protected_landTarget);

    datasetsTargetTwo.push(global);
    global = new Global(ChartCharacteristics["protected_land"], protected_land);
    datasetsTargetTwo.push(global);

    //target3
    global = new GlobalTarget(ChartCharacteristics["biodiversity_target"], target_biodiversity);
    datasetsTargetThree.push(global);
    global = new Global(ChartCharacteristics["biodiversity_land"], biodiversity_land);
    datasetsTargetThree.push(global);

  }

  var dataTargetOne = {
    labels: labels,
    datasets: datasetsTargetOne,
    CSV: response,
  };

  var dataTargetTwo = {
    labels: labels,
    datasets: datasetsTargetTwo,
    CSV2: response,
  };

  var dataTargeThree = {
    labels: labels,
    datasets: datasetsTargetThree,
    CSV: response,
  };

  var dataGlobal = {
    targetOne: dataTargetOne,
    targetTwo: dataTargetTwo,
    targetThree: dataTargeThree,
    TradeAdjustments: pathways
  };

  // console.log("GlobalTargetService dataGlobal: ", dataGlobal);

  return dataGlobal;

}

export default function getGlobalTargets(props) {
  
  try {
    const url = `${process.env.REACT_APP_URL}alltargetsy21${JSON.stringify(props)}`

    return fetch(url).then(res => res.json()).then(responseApi).catch(error => console.error('getGlobalTargets catch2', error));

  } catch (error) {
    console.error(error);
  }
}
