import ChartCharacteristics from '../../data/ChartCharacteristics.json';

const responseApi = response => {

  function Biodiversity(ChartCharacteristics, data) {

    this.data = data;
    this.type = ChartCharacteristics[0]["type"];
    this.label = ChartCharacteristics[0]["label"];
    this.borderColor = ChartCharacteristics[0]["borderColor"];
    this.backgroundColor = ChartCharacteristics[0]["backgroundColor"];

  }

  var labels = [];
  //-----------------target 3---------------//

  var biodiversity_land = [];
  var datasetsTargetThree = [];

  response = response.queryResponse;
  
  console.log('BiodiversityService: \n' + JSON.stringify(response));

  if (response.length !== 0) {
    response.forEach(item => {
      if (!labels.includes(item.year)) {
        labels.push(item.year);
      }
      biodiversity_land.push(item.Biodiversity_Land);
    });

    global = new Biodiversity(ChartCharacteristics["biodiversity_land"], biodiversity_land);
    datasetsTargetThree.push(global);

    var data = {
      labels: labels,
      datasets: datasetsTargetThree,
      CSV: response,
    };

  }

  return data;
}

export default function getBiodiversity(url, props) {

  try {
    
    return fetch(`${process.env.REACT_APP_URL}${url}${JSON.stringify(props)}`)
      .then(res => res.json()).then(responseApi);


  } catch (error) {
    console.error(error)
  }
}