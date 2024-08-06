
import ChartCharacteristics from '../../data/ChartCharacteristics.json';

const responseApi = response => {



  function Food(ChartCharacteristics, data) {
    this.data = data;
    this.type = ChartCharacteristics[0]["type"];
    this.label = ChartCharacteristics[0]["label"];
    this.borderColor = ChartCharacteristics[0]["borderColor"];
    this.backgroundColor = ChartCharacteristics[0]["backgroundColor"];
    this.radius = ChartCharacteristics[0]["radius"];
  }

  var labels = [];
  var target_mder = [];
  var kcal_feasible = [];
  var target = [];
  var dataSet = []

  response = response.queryResponse;
  if (response.length !== 0) {

    response.forEach(item => {

      target_mder.push(item.Target_MDER);

      kcal_feasible.push(item.Kcal_feasible);
      target.push(item.Target);
      labels.push(item.year);


    });

    var food = null;

    food = new Food(ChartCharacteristics["target"], target);
    dataSet.push(food);

    food = new Food(ChartCharacteristics["target_mder"], target_mder);
    dataSet.push(food);
    food = new Food(ChartCharacteristics["kcal_feasible"], kcal_feasible);
    dataSet.push(food);


    var data = {
      labels: labels,
      datasets: dataSet,
      CSV: response

    };

  }


  return data;
}







export default function getFoodEnergy(url, props) {
  try {
    console.log(props);
    return fetch(`${process.env.REACT_APP_URL}${url}${JSON.stringify(props)}`)
      .then(res => res.json()).then(responseApi);


  } catch (error) {
    console.error(error)
  }
}
