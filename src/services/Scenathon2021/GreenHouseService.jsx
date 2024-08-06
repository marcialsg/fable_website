
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

  function GreenHouseBartChart(ChartCharacteristics, data) {
    this.data = data;

    this.type = ChartCharacteristics[0]["type"];
    this.label = ChartCharacteristics[0]["label"];
    this.borderColor = ChartCharacteristics[0]["borderColor"];
    this.backgroundColor = ChartCharacteristics[0]["backgroundColor"];
    this.yAxisID = ChartCharacteristics[0]["yAxisID"];
  }

  function GreenHouseBartLine(ChartCharacteristics, data) {
    this.data = data;
    this.type = ChartCharacteristics[0]["type"];
    this.label = ChartCharacteristics[0]["label"];
    this.fill = ChartCharacteristics[0]["fill"];
    this.radius = ChartCharacteristics[0]["radius"];
    this.borderColor = ChartCharacteristics[0]["borderColor"];
    this.backgroundColor = ChartCharacteristics[0]["backgroundColor"];
    this.hoverBackgroundColor = ChartCharacteristics[0]["hoverBackgroundColor"];
    this.hoverBorderColor = ChartCharacteristics[0]["hoverBorderColor"];
    this.yAxisID = ChartCharacteristics[0]["yAxisID"];

  }

  function GreenHouseBartScatter(ChartCharacteristics, data) {
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

  var datasetsGraphOne = [];
  var datasetsGraphTwo = [];

  //variables chartOne
  var Livestock_CH4 = [];
  var Livestock_N20 = [];
  var Crop_N20 = [];
  var Crop_CH4 = [];
  var Crop_CO2 = [];
  var Total_GHG_agric = [];
  var FAO_GHGagric = [];
  var ghg_agri_target = [];
  var GHG_BIOFUEL = [];
  //variables chartTwo
  var deforestation = [];
  var Other_LUC = [];
  var sequestration = [];
  var peat = [];
  var total_GHG_land = [];
  var FAO_GHG_LU = [];
  var GHG_LU_target = [];

  var labels = [];
  var pathways = [];

  console.log('GreenHouseService response: \n', JSON.stringify(response, null, 2));

  pathways = response.pathways;    
  response = response.queryResponse;

  if (response.length !== 0) {

    response.forEach(item => {
      
      if (!labels.includes(item.Year)) {
        labels.push(item.Year);
      }
      //chart one

      Livestock_CH4.push(item.Livestock_CH4);
      Livestock_N20.push(item.Livestock_N20);
      Crop_N20.push(item.Crop_N20);
      Crop_CH4.push(item.Crop_CH4);
      Crop_CO2.push(item.Crop_CO2);

      Total_GHG_agric.push(item.Total_GHG_agric);
      FAO_GHGagric.push(item.FAO_GHGagric);
      ghg_agri_target.push(item.ghg_agri_target);
      GHG_BIOFUEL.push(item.GHG_BIOFUEL);
      //chart TWO
      deforestation.push(item.deforestation)
      Other_LUC.push(item.Other_LUC)
      sequestration.push(item.sequestration)
      peat.push(item.peat)

      total_GHG_land.push(item.total_GHG_land)
      FAO_GHG_LU.push(item.fao_ghg_lu)
      GHG_LU_target.push(item.GHG_LU_target)

    });
    //chart one

    FAO_GHG_LU = FAO_GHG_LU.map(function (x) {

      if (Number(x) === 0) {
        return null;
      } else {
        return x;
      }
    })

    //variables chartOne

    var grenHouse = new GreenHouseBartScatter(ChartCharacteristics["FAO_GHGagric"], FAO_GHGagric);
    datasetsGraphOne.push(grenHouse);
    grenHouse = new GreenHouseBartScatter(ChartCharacteristics["ghg_agri_target"], ghg_agri_target);
    datasetsGraphOne.push(grenHouse);

    grenHouse = new GreenHouseBartLine(ChartCharacteristics["Total_GHG_agric"], Total_GHG_agric);
    datasetsGraphOne.push(grenHouse);

    grenHouse = new GreenHouseBartChart(ChartCharacteristics["Livestock_CH4"], Livestock_CH4);
    datasetsGraphOne.push(grenHouse);
    grenHouse = new GreenHouseBartChart(ChartCharacteristics["Livestock_N20"], Livestock_N20);
    datasetsGraphOne.push(grenHouse);
    grenHouse = new GreenHouseBartChart(ChartCharacteristics["Crop_N20"], Crop_N20);
    datasetsGraphOne.push(grenHouse);
    grenHouse = new GreenHouseBartChart(ChartCharacteristics["Crop_CH4"], Crop_CH4);
    datasetsGraphOne.push(grenHouse);
    grenHouse = new GreenHouseBartChart(ChartCharacteristics["Crop_CO2"], Crop_CO2);
    datasetsGraphOne.push(grenHouse);
    grenHouse = new GreenHouseBartChart(ChartCharacteristics["GHG_BIOFUEL"], GHG_BIOFUEL);
    datasetsGraphOne.push(grenHouse);

    //chart two

    grenHouse = new GreenHouseBartScatter(ChartCharacteristics["FAO_GHG_LU"], FAO_GHG_LU);
    datasetsGraphTwo.push(grenHouse);
    grenHouse = new GreenHouseBartScatter(ChartCharacteristics["GHG_LU_target"], GHG_LU_target);
    datasetsGraphTwo.push(grenHouse);

    grenHouse = new GreenHouseBartLine(ChartCharacteristics["total_GHG_land"], total_GHG_land);
    datasetsGraphTwo.push(grenHouse);


    grenHouse = new GreenHouseBartChart(ChartCharacteristics["deforestation"], deforestation);
    datasetsGraphTwo.push(grenHouse);
    grenHouse = new GreenHouseBartChart(ChartCharacteristics["Other_LUC"], Other_LUC);
    datasetsGraphTwo.push(grenHouse);
    grenHouse = new GreenHouseBartChart(ChartCharacteristics["sequestration"], sequestration);
    datasetsGraphTwo.push(grenHouse);
    grenHouse = new GreenHouseBartChart(ChartCharacteristics["peat"], peat);
    datasetsGraphTwo.push(grenHouse);

    var dataChartOne = {
      labels: labels,
      datasets: datasetsGraphOne
    };

    var dataCharTwo = {
      labels: labels,
      datasets: datasetsGraphTwo
    };

    var dataCharts = {
      chartOne: dataChartOne,
      charTwo: dataCharTwo,
      CSV: response,
      Pathways: await getPathWaysList(pathways),
      TradeAdjustments: pathways
    };

  }

  return dataCharts;
}

export default function getGreenHouseOne(props) {
  try {

    return fetch(`${process.env.REACT_APP_URL}GlobalghgEtarget${JSON.stringify(props)}`).then(res => res.json()).then(responseApi);

  } catch (error) {
    console.error(error)
  }
}
