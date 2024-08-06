

import ChartCharacteristics from '../../data/ChartCharacteristics.json';
const responseApi = response => {

  function FoodSecurity(ChartCharacteristics, data) {

    this.data = data;
    this.type = ChartCharacteristics[0]["type"];
    this.label = ChartCharacteristics[0]["label"];
    this.borderColor = ChartCharacteristics[0]["borderColor"];
    this.backgroundColor = ChartCharacteristics[0]["backgroundColor"];

  }

  function FoodSecurityTarget(ChartCharacteristics, data) {
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

  //------------------------target 5-----------------------//
  var labels = [];
  var kcal_feasible = [];
  var target_MDER = [];
  var target = [];
  var datasetsTargetFive = [];

  response = response.queryResponse;

  if (response.length !== 0) {

    response.forEach(item => {
      if (!labels.includes(item.Country)) {
        labels.push(item.Country);
      }

      //target Six
      kcal_feasible.push(item.kcal_feasible);
      target_MDER.push(item.target_mder);


    });

    //target six
    var foodEnergy = new FoodSecurityTarget(ChartCharacteristics["target_mder"], target_MDER);
    datasetsTargetFive.push(foodEnergy);
    foodEnergy = new FoodSecurity(ChartCharacteristics["kcal_feasible"], kcal_feasible);
    datasetsTargetFive.push(foodEnergy);

  }


  var data = {
    labels: labels,
    datasets: datasetsTargetFive
  };


  return data;
}

export default function getFoodSecurity(props) {
  try {

    return fetch(`${process.env.REACT_APP_URL}target5${JSON.stringify(props)}`)
      .then(res => res.json()).then(responseApi);



  } catch (error) {
    console.error(error)
  }
}
