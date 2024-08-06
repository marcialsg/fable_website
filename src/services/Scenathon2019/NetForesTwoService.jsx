import countries_characteristics from '../../data/countries_characteristics.json';

function responseApi(response) {


  function NetForest(nameCountry, data) {
    let characteristic = countries_characteristics[nameCountry];
    if (characteristic !== undefined) {
      this.data = data;
      this.type = characteristic[0]["type"];
      this.label = characteristic[0]["label"];
      this.borderColor = characteristic[0]["borderColor"];
      this.backgroundColor = characteristic[0]["backgroundColor"];
    }
  }

  var count = 0;
  var NetForestChange = [];
  var datasetAux = [];
  var labels = [];
  var nameCounty = "";
  var i = 0;

  response = response.queryResponse;

  if (response.length !== 0) {


    nameCounty = response[0].name;
    response.forEach(item => {
      i++;
      if (!labels.includes(item.year)) {
        labels.push(item.year);
      }

      if (nameCounty !== item.country || i === response.length) {

        if (count !== NetForestChange.length) {
          if (i === response.length) { NetForestChange.push(item.NetForestChange); }
          var netForest = new NetForest(nameCounty, NetForestChange);
          datasetAux.push(netForest);
        }

        count = 0;
        nameCounty = item.country;
        NetForestChange = [];

      }
      NetForestChange.push(item.NetForestChange);
      count = item.NetForestChange === "0.00" || item.NetForestChange === 0 ? count + 1 : count;

    });

  }





  var dataChart = {
    labels: labels,
    datasets: datasetAux
  }
  var data = {
    chart: dataChart,
    CSV: response
  };


  return data;

}

function getNetForesTwo(url, props) {
  try {


    const response = fetch(`${process.env.REACT_APP_URL}${url}${JSON.stringify(props)}`)
      .then(res => res.json()).then(responseApi);
    return response;
  } catch (error) {
    console.error(error)
  }
}


export { getNetForesTwo };
