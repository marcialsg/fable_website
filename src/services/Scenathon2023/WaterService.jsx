import ChartCharacteristics from "../../data/ChartCharacteristics.json";
import countries_characteristics from "../../data/countries_characteristics.json";
const getPathWaysList = async (pathways) => {
  const pathWayList = [];

  for (var i = 0; i < Object.keys(pathways).length; i++) {
    const pathwayElement_index = Object.keys(pathways)[i];

    const pathwayElement = pathways[pathwayElement_index]["label"];

    pathWayList.push(pathwayElement);
  }

  return pathWayList;
};

function DatasetWater(calcMetric, data) {
  let characteristic = ChartCharacteristics[calcMetric];

  if (characteristic !== undefined) {
    console.log("WaterService characteristic !== undefined");

    this.data = data;
    this.type = characteristic[0]["type"];
    this.label = characteristic[0]["label"];
    this.borderColor = characteristic[0]["borderColor"];
    this.backgroundColor = characteristic[0]["backgroundColor"];

    if (this.type === "scatter") {
      this.borderWidth = characteristic[0]["borderWidth"];
      this.radius = characteristic[0]["radius"];
      this.usePointStyle = characteristic[0]["usePointStyle"];
      this.pointStyle = characteristic[0]["pointStyle"];
    }
  } else {
    console.log("WaterService characteristic === undefined");
  }
}

function CountryDatasetWater(nameCountry, data) {
  let characteristic = countries_characteristics[nameCountry];

  if (characteristic !== undefined) {
    this.data = data;
    this.type = characteristic[0]["type"];
    this.label = characteristic[0]["label"];
    this.borderColor = characteristic[0]["borderColor"];
    this.backgroundColor = characteristic[0]["backgroundColor"];
  }
}

const responseApi = async (response, indicator, selectedCountry) => {
  var datasets = [];
  var labels = [];

  console.log("WaterService response: ", response);

  var pathways = response.pathways;
  response = response.queryResponse;

  if (response.length !== 0) {
    switch (indicator) {
      case "water_use_for_irrigation":
        var datasetContents = {};

        response.forEach((item) => {
          if (!labels.includes(item.Year)) {
            labels.push(item.Year);
          }
          console.log("Year Value: "+item.Year);
          // if (item.Year < 2025) {
          //   // histwaterirrigation
          //   if (datasetContents["histwaterirrigation"] === undefined) {
          //     datasetContents["histwaterirrigation"] = [];
          //   }

          //   datasetContents["histwaterirrigation"].push(item.histwaterirrigation);
          // }

          // calcwfblue
          if (datasetContents["calcwfblue"] === undefined) {
            datasetContents["calcwfblue"] = [];
          }

          datasetContents["calcwfblue"].push(item.calcwfblue);
        });

        if (selectedCountry === "") {
          const targetValue = 2453;

          var waterTargetData = Array.from({ length: 11 }, (_, i) => null);

          const years = Array.from({ length: 11 }, (_, i) => 2000 + i * 5);

          waterTargetData[years.indexOf(2050)] = targetValue;


          const dataset = new DatasetWater("ghg_target_data", waterTargetData);

          datasets.push(dataset);
        }

        for (var calcMetric in datasetContents) {
          const dataset = new DatasetWater(
            calcMetric.toLowerCase(),
            datasetContents[calcMetric]
          );

          datasets.push(dataset);
        }

        break;

      case "water_use_for_irrigation_by_country":
        var labels = [];
        var nameCountry = "";

        if (response.length !== 0) {
          nameCountry = response[0].name;

          var countryData = {};

          response.forEach((item) => {
            if (!labels.includes(item.Year)) {
              labels.push(item.Year);
            }
            //
            if (countryData[item.Country] === undefined) {
              countryData[item.Country] = [];
            }

            countryData[item.Country].push(item.calcwfblue);
          });

          for (var country in countryData) {
            const dataset = new CountryDatasetWater(
              country,
              countryData[country]
            );
            datasets.push(dataset);
          }
        }

        break;
    }
  }

  const data = {
    labels: labels,
    datasets: datasets,
    CSV: response,
    scenathonData: pathways
  };

  console.log("WaterService data: ", data);

  return data;
};

export default function getWater(target, indicator, props) {
  try {
    const url = `${target}/${indicator}/`;
    const query = `${process.env.REACT_APP_URL}${url}${JSON.stringify(props)}`;
    console.log("WaterService query: ", query);
    return fetch(query)
      .then((res) => res.json())
      .then((res) => responseApi(res, indicator, props.select.country));
  } catch (error) {
    console.error(error);
  }
}
