import ChartCharacteristics from "../../data/ChartCharacteristics.json";
import countriesCharacteristics from "../../data/countries_characteristics.json";

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
  this.pointHoverBackgroundColor =
    ChartCharacteristics[0]["pointHoverBackgroundColor"];
  this.pointHoverBorderColor = ChartCharacteristics[0]["pointHoverBorderColor"];
  this.yAxisID = ChartCharacteristics[0]["yAxisID"];
}

function FoodSecurity(ChartCharacteristics, data) {
  this.data = data;
  this.type = ChartCharacteristics[0]["type"];
  this.label = ChartCharacteristics[0]["label"];
  this.borderColor = ChartCharacteristics[0]["borderColor"];
  this.backgroundColor = ChartCharacteristics[0]["backgroundColor"];
}

function CountryDatasetFoodSecurity(nameCountry, data) {
  let characteristic = countriesCharacteristics[nameCountry];

  if (characteristic !== undefined) {
    this.data = data;
    this.type = characteristic[0]["type"];
    this.label = characteristic[0]["label"];
    this.borderColor = characteristic[0]["borderColor"];
    this.backgroundColor = characteristic[0]["backgroundColor"];
  } else {
    let characteristic = ChartCharacteristics[nameCountry];
    this.data = data;
    this.type = characteristic[0]["type"];
    this.label = characteristic[0]["label"];
    this.borderColor = characteristic[0]["borderColor"];
    this.backgroundColor = characteristic[0]["backgroundColor"];
  }
}

function sortJSON(data, key, orden) {
  return data.sort(function (a, b) {
    var x = a[key],
      y = b[key];

    if (orden === "asc") {
      if (x.includes("Rest") && y.includes("Rest")) {
        return x < y ? -1 : x > y ? 1 : 0;
      } else if (x.includes("Rest")) {
        return 1;
      } else if (y.includes("Rest")) {
        return -1;
      } else {
        return x < y ? -1 : x > y ? 1 : 0;
      }
    }

    if (orden === "desc") {
      if (x.includes("Rest") && y.includes("Rest")) {
        return x > y ? -1 : x < y ? 1 : 0;
      } else if (x.includes("Rest")) {
        return -1;
      } else if (y.includes("Rest")) {
        return 1;
      } else {
        return x > y ? -1 : x < y ? 1 : 0;
      }
    }
  });
}

const getPathWaysList = async (pathways) => {
  const pathWayList = [];

  for (var i = 0; i < Object.keys(pathways).length; i++) {
    const pathwayElement_index = Object.keys(pathways)[i];

    const pathwayElement = pathways[pathwayElement_index]["label"];

    pathWayList.push(pathwayElement);
  }

  return pathWayList;
};

const responseApi = async (response, indicator) => {
  var data = {};
  var labels = [];
  var datasets = [];

  var pathways = response.pathways;
  response = response.queryResponse;

  if (indicator === "average_daily_intake_per_capita_in_2030") {
    response = sortJSON(response, "Country", "asc");
  } else if (indicator === "prevalence_of_undernourishment_in_2030") {
    response = sortJSON(response, "Country", "asc");
  }

  console.log("FoodEnergyService responseApi response: ", response);

  switch (indicator) {
    case "average_daily_intake_per_capita_in_2030":
      var countryContents = {};

      response.forEach((item) => {
        console.log("FoodEnergyService responseApi item: ", item);

        if (!labels.includes(item.alpha2)) {
          labels.push(item.alpha2);
        }

        // Target_MDERup
        if (countryContents["Target_MDERup"] === undefined) {
          countryContents["Target_MDERup"] = [];
        }

        countryContents["Target_MDERup"].push(item.Target_MDER * 1.5);

        // Target_MDERdown
        if (countryContents["Target_MDERdown"] === undefined) {
          countryContents["Target_MDERdown"] = [];
        }

        countryContents["Target_MDERdown"].push(item.Target_MDER * 1.1);

        // Kcal_feasible
        if (countryContents["Kcal_feasible"] === undefined) {
          countryContents["Kcal_feasible"] = [];
        }

        countryContents["Kcal_feasible"].push(item.Kcal_feasible);
      });

      var foodDataset = new FoodSecurityTarget(
        ChartCharacteristics["target_mderup"],
        countryContents["Target_MDERup"]
      );
      datasets.push(foodDataset);
      var foodDataset = new FoodSecurityTarget(
        ChartCharacteristics["target_mderdown"],
        countryContents["Target_MDERdown"]
      );
      datasets.push(foodDataset);
      foodDataset = new FoodSecurity(
        ChartCharacteristics["kcal_feasiblenew"],
        countryContents["Kcal_feasible"]
      );
      datasets.push(foodDataset);

      data = {
        labels: labels,
        datasets: datasets,
        CSV: response,
        scenathonData: pathways,
      };

      break;

    case "evolution_of_daily_calories_intake_per_capita_by_country":
      var countryContents = {};
      var cont = 0;
      response.forEach((item) => {
        if (!labels.includes(item.year)) {
          labels.push(item.year);
        }
        // HistKfeas
        if (item.year < 2025 && cont < 5) {
          cont = cont + 1;
          if (countryContents["HistKcal"] === undefined) {
            countryContents["HistKcal"] = [];
          }

          countryContents["HistKcal"].push(item.HistKcal);
        }
        // Target_MDER
        // Target_MDERup
        if (countryContents["Target_MDERup"] === undefined) {
          countryContents["Target_MDERup"] = [];
        }

        countryContents["Target_MDERup"].push(item.Target_MDER * 1.5);

        // Target_MDERdown
        if (countryContents["Target_MDERdown"] === undefined) {
          countryContents["Target_MDERdown"] = [];
        }

        countryContents["Target_MDERdown"].push(item.Target_MDER * 1.1);

        if (countryContents["Kcal_feasible"] === undefined) {
          countryContents["Kcal_feasible"] = [];
        }

        countryContents["Kcal_feasible"].push(item.Kcal_feasible);
      });

      var foodDataset = new FoodSecurityTarget(
        ChartCharacteristics["target_mderup"],
        countryContents["Target_MDERup"]
      );
      datasets.push(foodDataset);

      var foodDataset = new FoodSecurityTarget(
        ChartCharacteristics["target_mderdown"],
        countryContents["Target_MDERdown"]
      );
      datasets.push(foodDataset);

      var foodDataset = new FoodSecurityTarget(
        ChartCharacteristics["histkcal"],
        countryContents["HistKcal"]
      );
      datasets.push(foodDataset);

      var foodDataset = new FoodSecurity(
        ChartCharacteristics["kcal_feasiblenew"],
        countryContents["Kcal_feasible"]
      );
      datasets.push(foodDataset);

      data = {
        labels: labels,
        datasets: datasets,
        CSV: response,
        scenathonData: pathways,
      };

      break;

    case "prevalence_of_undernourishment_in_2030":
      var countryContents = {};

      response.forEach((item) => {
        console.log("FoodEnergyService responseApi item: ", item);

        if (!labels.includes(item.alpha2)) {
          labels.push(item.alpha2);
        }
        if (countryContents["<2.5Pou_Computed"] === undefined) {
          countryContents["<2.5Pou_Computed"] = [];
        }
        // Pou_Computed
        if (countryContents["Pou_Computed"] === undefined) {
          countryContents["Pou_Computed"] = [];
        }
        if (item.Pou_Computed == null) {
          countryContents["Pou_Computed"].push(2.5);
          countryContents["<2.5Pou_Computed"].push(2.5);
        } else {
          countryContents["Pou_Computed"].push(item.Pou_Computed);
          countryContents["<2.5Pou_Computed"].push(null);
        }

        // Target_pou
        if (countryContents["target_pou"] === undefined) {
          countryContents["target_pou"] = [];
        }

        countryContents["target_pou"].push(5);
      });

      var foodDataset = new FoodSecurity(
        ChartCharacteristics["target_pou"],
        countryContents["target_pou"]
      );
      datasets.push(foodDataset);

      var foodDataset = new FoodSecurity(
        ChartCharacteristics["<2.5target_pou"],
        countryContents["<2.5Pou_Computed"]
      );
      datasets.push(foodDataset);

      var foodDataset = new FoodSecurity(
        ChartCharacteristics["pou_computed"],
        countryContents["Pou_Computed"]
      );
      datasets.push(foodDataset);

      data = {
        labels: labels,
        datasets: datasets,
        CSV: response,
        scenathonData: pathways,
      };

      break;

    case "evolution_of_prevalence_of_undernourishment_by_country":
      var countryContents = {};
      var cont = 0;
      response.forEach((item) => {
        if (!labels.includes(item.year)) {
          labels.push(item.year);
        }

        // Target_MDERup
        if (countryContents["target_pou"] === undefined) {
          countryContents["target_pou"] = [];
        }

        countryContents["target_pou"].push(5);

        if (countryContents["<2.5Pou_Computed"] === undefined) {
          countryContents["<2.5Pou_Computed"] = [];
        }

        if (countryContents["Pou_Computed"] === undefined) {
          countryContents["Pou_Computed"] = [];
        }
        if (item.Pou_Computed == null) {
          countryContents["Pou_Computed"].push(2.5);
          countryContents["<2.5Pou_Computed"].push(2.5);
        } else {
          countryContents["Pou_Computed"].push(item.Pou_Computed);
          countryContents["<2.5Pou_Computed"].push(null);
        }
      });

      var foodDataset = new FoodSecurityTarget(
        ChartCharacteristics["target_pou"],
        countryContents["target_pou"]
      );
      datasets.push(foodDataset);

      var foodDataset = new FoodSecurity(
        ChartCharacteristics["<2.5target_pou"],
        countryContents["<2.5Pou_Computed"]
      );
      datasets.push(foodDataset);

      var foodDataset = new FoodSecurity(
        ChartCharacteristics["pou_computed"],
        countryContents["Pou_Computed"]
      );
      datasets.push(foodDataset);

      data = {
        labels: labels,
        datasets: datasets,
        CSV: response,
        scenathonData: pathways,
      };

      break;

    case "share_of_undernourished":
    case "share_of_obese":
      function GreenHouseBartLine(ChartCharacteristics, data) {
        this.data = data;
        this.type = ChartCharacteristics[0]["type"];
        this.label = ChartCharacteristics[0]["label"];
        this.fill = ChartCharacteristics[0]["fill"];
        this.radius = ChartCharacteristics[0]["radius"];
        this.borderColor = ChartCharacteristics[0]["borderColor"];
        this.backgroundColor = ChartCharacteristics[0]["backgroundColor"];
        this.hoverBackgroundColor =
          ChartCharacteristics[0]["hoverBackgroundColor"];
        this.hoverBorderColor = ChartCharacteristics[0]["hoverBorderColor"];
        this.yAxisID = ChartCharacteristics[0]["yAxisID"];
      }

      var datasetsGraphOne = [];

      //variables chartOne
      var Total_GHG_agric = [];

      if (response.length !== 0) {
        response.forEach((item) => {
          if (!labels.includes(item.Year)) {
            labels.push(item.Year);
          }

          Total_GHG_agric.push(item.Total_GHG_agric);
        });

        //variables chartOne
        var grenHouse = new GreenHouseBartLine(
          ChartCharacteristics["Total_GHG_agric"],
          Total_GHG_agric
        );
        datasetsGraphOne.push(grenHouse);

        data = {
          labels: labels,
          datasets: datasetsGraphOne,
          CSV: response,
          scenathonData: pathways,
        };
      }

      break;
  }

  console.log("FoodEnergyService data: ", data);
  return data;
};

export default function getFoodEnergy(target, indicator, props) {
  try {
    console.log("REACT_APP_URL: ", process.env.REACT_APP_URL);
    const url = `${target}/${indicator}/`;
    const query = `${process.env.REACT_APP_URL}${url}${JSON.stringify(props)}`;

    return fetch(query)
      .then((res) => res.json())
      .then((res) => responseApi(res, indicator));
  } catch (error) {
    console.error(error);
  }
}
