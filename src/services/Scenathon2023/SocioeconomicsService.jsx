import ChartCharacteristics from "../../data/ChartCharacteristics.json";

const getPathWaysList = async (pathways) => {
  const pathWayList = [];

  for (var i = 0; i < Object.keys(pathways).length; i++) {
    const pathwayElement_index = Object.keys(pathways)[i];

    const pathwayElement = pathways[pathwayElement_index]["label"];

    pathWayList.push(pathwayElement);
  }

  return pathWayList;
};

function Socioeconomics(ChartCharacteristics, data) {
  this.data = data;
  this.type = ChartCharacteristics[0]["type"];
  this.label = ChartCharacteristics[0]["label"];
  this.borderColor = ChartCharacteristics[0]["borderColor"];
  this.backgroundColor = ChartCharacteristics[0]["backgroundColor"];
}

const responseApi = async (response, indicator) => {
  var data = {};
  var labels = [];
  var datasets = [];
  var pathways = [];
  var products = [];

  console.log("SocioeconomicsService responseApi response: ", response);
  console.log("SocioeconomicsService indicatorName: ", indicator);
  pathways = response.pathways;
  products = response.products;
  response = response.queryResponse;

  switch (indicator) {
    case "total_costs_of_production":
      var costContents = {};

      response.forEach((item) => {
        if (item.year !== null) {
          if (!labels.includes(item.year)) {
            labels.push(item.year);
          }

          // SumDieselCost
          if (costContents["SumDieselCost"] === undefined) {
            costContents["SumDieselCost"] = [];
          }
          costContents["SumDieselCost"].push(item.SumDieselCost);
          // SumFertilizerCost
          if (costContents["SumFertilizerCost"] === undefined) {
            costContents["SumFertilizerCost"] = [];
          }

          costContents["SumFertilizerCost"].push(item.SumFertilizerCost);

          // SumLabourCost
          if (costContents["SumLabourCost"] === undefined) {
            costContents["SumLabourCost"] = [];
          }

          costContents["SumLabourCost"].push(item.SumLabourCost);

          // SumMachineryRunningCost
          if (costContents["SumMachineryRunningCost"] === undefined) {
            costContents["SumMachineryRunningCost"] = [];
          }

          costContents["SumMachineryRunningCost"].push(
            item.SumMachineryRunningCost
          );

          // SumPesticideCost
          if (costContents["SumPesticideCost"] === undefined) {
            costContents["SumPesticideCost"] = [];
          }

          costContents["SumPesticideCost"].push(item.SumPesticideCost);
        }
      });

      console.log(
        "SocioeconomicsService responseApi costContents: ",
        costContents
      );

      var socioeconomicsDataset = new Socioeconomics(
        ChartCharacteristics["SumDieselCost"],
        costContents["SumDieselCost"]
      );
      datasets.push(socioeconomicsDataset);

      socioeconomicsDataset = new Socioeconomics(
        ChartCharacteristics["SumFertilizerCost"],
        costContents["SumFertilizerCost"]
      );
      datasets.push(socioeconomicsDataset);

      socioeconomicsDataset = new Socioeconomics(
        ChartCharacteristics["SumLabourCost"],
        costContents["SumLabourCost"]
      );
      datasets.push(socioeconomicsDataset);

      socioeconomicsDataset = new Socioeconomics(
        ChartCharacteristics["SumMachineryRunningCost"],
        costContents["SumMachineryRunningCost"]
      );
      datasets.push(socioeconomicsDataset);

      socioeconomicsDataset = new Socioeconomics(
        ChartCharacteristics["SumPesticideCost"],
        costContents["SumPesticideCost"]
      );
      datasets.push(socioeconomicsDataset);

      data = {
        labels: labels,
        datasets: datasets,
        CSV: response,
        products: products,
        scenathonData: pathways,
      };
      break;

    case "employment_in_agriculture:_eat_food_groups":
      var costContents = {};

      response.forEach((item) => {
        if (item.year !== null) {
          if (!labels.includes(item.year)) {
            labels.push(item.year);
          }
        }

        if (costContents["rice"] === undefined) {
          costContents["rice"] = [];
        }

        costContents["rice"].push(item.rice);

        if (costContents["sugar"] === undefined) {
          costContents["sugar"] = [];
        }

        costContents["sugar"].push(item.sugar);

        if (costContents["roots"] === undefined) {
          costContents["roots"] = [];
        }

        costContents["roots"].push(item.roots);

        if (costContents["wheat"] === undefined) {
          costContents["wheat"] = [];
        }

        costContents["wheat"].push(item.wheat);

        if (costContents["legumes"] === undefined) {
          costContents["legumes"] = [];
        }

        costContents["legumes"].push(item.legumes);

        if (costContents["oil_veg"] === undefined) {
          costContents["oil_veg"] = [];
        }

        costContents["oil_veg"].push(item.oil_veg);

        if (costContents["othr_grains"] === undefined) {
          costContents["othr_grains"] = [];
        }

        costContents["othr_grains"].push(item.othr_grains);

        if (costContents["soybeans"] === undefined) {
          costContents["soybeans"] = [];
        }

        costContents["soybeans"].push(item.soybeans);

        if (costContents["nuts_seeds"] === undefined) {
          costContents["nuts_seeds"] = [];
        }

        costContents["nuts_seeds"].push(item.nuts_seeds);

        if (costContents["maize"] === undefined) {
          costContents["maize"] = [];
        }

        costContents["maize"].push(item.maize);
      });
      socioeconomicsDataset = new Socioeconomics(
        ChartCharacteristics["rice"],
        costContents["rice"]
      );
      datasets.push(socioeconomicsDataset);

      socioeconomicsDataset = new Socioeconomics(
        ChartCharacteristics["sugar"],
        costContents["sugar"]
      );
      datasets.push(socioeconomicsDataset);
      socioeconomicsDataset = new Socioeconomics(
        ChartCharacteristics["roots"],
        costContents["roots"]
      );
      datasets.push(socioeconomicsDataset);

      socioeconomicsDataset = new Socioeconomics(
        ChartCharacteristics["wheat"],
        costContents["wheat"]
      );
      datasets.push(socioeconomicsDataset);
      socioeconomicsDataset = new Socioeconomics(
        ChartCharacteristics["legumes"],
        costContents["legumes"]
      );
      datasets.push(socioeconomicsDataset);

      socioeconomicsDataset = new Socioeconomics(
        ChartCharacteristics["oil_veg"],
        costContents["oil_veg"]
      );
      datasets.push(socioeconomicsDataset);
      socioeconomicsDataset = new Socioeconomics(
        ChartCharacteristics["othr_grains"],
        costContents["othr_grains"]
      );
      datasets.push(socioeconomicsDataset);

      socioeconomicsDataset = new Socioeconomics(
        ChartCharacteristics["soybeans"],
        costContents["soybeans"]
      );
      datasets.push(socioeconomicsDataset);
      socioeconomicsDataset = new Socioeconomics(
        ChartCharacteristics["nuts_seeds"],
        costContents["nuts_seeds"]
      );
      datasets.push(socioeconomicsDataset);

      socioeconomicsDataset = new Socioeconomics(
        ChartCharacteristics["maize"],
        costContents["maize"]
      );
      datasets.push(socioeconomicsDataset);

      data = {
        labels: labels,
        datasets: datasets,
        CSV: response,
        scenathonData: pathways,
      };
      break;

    case "employment_in_agriculture:_crops_vs_livestock":
      var costContents = {};

      response.forEach((item) => {
        if (item.year !== null) {
          if (!labels.includes(item.year)) {
            labels.push(item.year);
          }
        }

        if (costContents["crops"] === undefined) {
          costContents["crops"] = [];
        }

        costContents["crops"].push(item.crops);

        if (costContents["livestock"] === undefined) {
          costContents["livestock"] = [];
        }

        costContents["livestock"].push(item.livestock);
      });
      socioeconomicsDataset = new Socioeconomics(
        ChartCharacteristics["crops"],
        costContents["crops"]
      );
      datasets.push(socioeconomicsDataset);

      socioeconomicsDataset = new Socioeconomics(
        ChartCharacteristics["livestock"],
        costContents["livestock"]
      );
      datasets.push(socioeconomicsDataset);

      data = {
        labels: labels,
        datasets: datasets,
        CSV: response,
        products: products,
        scenathonData: pathways,
      };
      break;
  }

  return data;
};

export default function getSocioeconomics(target, indicator, props) {
  try {
    const url = `${target}/${indicator.replace(":", "")}/`;
    const query = `${process.env.REACT_APP_URL}${url}${JSON.stringify(props)}`;
    
    return fetch(query)
      .then((res) => res.json())
      .then((res) => responseApi(res, indicator));
  } catch (error) {
    console.error(error);
  }
}
