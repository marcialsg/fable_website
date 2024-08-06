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

  }



  var labels = [];
  var Protein_feasible = [];
  var Fat_feasible = [];
  var dataSet = []

  const pathways = response.pathways;    
  response = response.queryResponse;

  if (response.length !== 0) {

    response.forEach(item => {
      labels.push(item.Country);
      Protein_feasible.push(item.Protein_feasible);
      Fat_feasible.push(item.Fat_feasible);

    });

    var food = new Food(ChartCharacteristics["Protein_feasible"], Protein_feasible);
    dataSet.push(food);
    food = new Food(ChartCharacteristics["Fat_feasible"], Fat_feasible);
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


export default function getFoodEnergyTwo(props) {

  try {

    return fetch(`${process.env.REACT_APP_URL}Lowdietary${JSON.stringify(props)}`)

      .then(res => res.json()).then(responseApi);

  } catch (error) {
    console.error(error)
  }
}