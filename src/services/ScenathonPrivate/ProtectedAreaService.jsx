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


  function Area(ChartCharacteristics, data) {
    this.data = data;
    this.type = ChartCharacteristics[0]["type"];
    this.label = ChartCharacteristics[0]["label"];
    this.borderColor = ChartCharacteristics[0]["borderColor"];
    this.backgroundColor = ChartCharacteristics[0]["backgroundColor"];

  }

  var labels = [];
  var areaForest = [];
  var areaOther = [];
  var areaOtherNta = [];
  var areas = [];
  var pathways = [];
  var countries = [];

  countries = response.countries;   
  pathways = response.pathways;    
  response = response.queryResponse;


  if (response.length !== 0) {

    console.log("ProtectedAreaByType service: response: ", response);
    

    response.forEach(item => {
      if (!labels.includes(item.year)) {
        labels.push(item.year);
      }

      areaForest.push(item.ProtectedAreasForest);
      areaOther.push(item.ProtectedAreasOther);
      areaOtherNta.push(item.ProtectedAreasOtherNat);

    });

    var area = new Area(ChartCharacteristics["ProtectedAreasForest"], areaForest);
    areas.push(area);
    area = new Area(ChartCharacteristics["ProtectedAreasOther"], areaOther);
    areas.push(area);
    area = new Area(ChartCharacteristics["ProtectedAreasOtherNat"], areaOtherNta);
    areas.push(area);
  }

  var data = {
    labels: labels,
    datasets: areas,
    CSV: response,
    Pathways: await getPathWaysList(pathways),
    TradeAdjustments: pathways,
    Countries : countries
  };
  return data;

}



export default function getProtectedAreaByType(props) {
  try {


    console.log(props)
    return fetch(`${process.env.REACT_APP_URL}privateprotectedAreas${JSON.stringify(props)}`)
      .then(res => res.json()).then(responseApi);


  } catch (error) {
    console.error(error)
  }
}
