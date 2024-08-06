
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

  function Food(ChartCharacteristics, data) {
    this.data = data;
    this.type = ChartCharacteristics[0]["type"];
    this.label = ChartCharacteristics[0]["label"];
    this.borderColor = ChartCharacteristics[0]["borderColor"];
    this.backgroundColor = ChartCharacteristics[0]["backgroundColor"];
    this.radius = ChartCharacteristics[0]["radius"];
  }

  function FoodBartLine(ChartCharacteristics, data) {
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



  var labels = [];
  var target_mder = [];
  var kcal_feasible = [];
  var kcal_target = [];
  var dataSet = []

  const pathways = response.pathways;    
  response = response.queryResponse;


  if (response.length !== 0) {

    response.forEach(item => {

      target_mder.push(item.Target_MDER);

      kcal_feasible.push(item.Kcal_feasible);
      if (item.kcal_target !== undefined) {
        kcal_target.push(item.kcal_target);
        labels.push(item.Year);
      } else {
        labels.push(item.Country);
      }


    });

    var food = null;

    if (kcal_target.length !== 0) {
      food = new FoodBartLine(ChartCharacteristics["MDER"], kcal_target);
      dataSet.push(food);
    }
    food = new Food(ChartCharacteristics["target_mder"], target_mder);
    dataSet.push(food);
    food = new Food(ChartCharacteristics["kcal_feasible"], kcal_feasible);
    dataSet.push(food);

  }

  var data = {
    labels: labels,
    datasets: dataSet,
    CSV: response,
    Pathways: await getPathWaysList(pathways),
    TradeAdjustments: pathways
  };

  return data;
}







export default function getFoodEnergy(url, props) {
  try {
    
    return fetch(`${process.env.REACT_APP_URL}${url}${JSON.stringify(props)}`)
      .then(res => res.json()).then(responseApi);


  } catch (error) {
    console.error(error)
  }
}
