import ChartCharacteristics from "../../data/ChartCharacteristics.json";
import countriesCharacteristics from "../../data/countries_characteristics.json";

require("dotenv").config();

function DatasetGHG(calcMetric, data) {
  let characteristic = ChartCharacteristics[calcMetric];

  if (characteristic !== undefined) {
    console.log("GHGService characteristic !== undefined");

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
    console.log("GHGService characteristic === undefined");
  }
}

function CountryDatasetGHG(nameCountry, data) {
  let characteristic = countriesCharacteristics[nameCountry];
  let characteristic2 = ChartCharacteristics[nameCountry];

  if (characteristic !== undefined) {
    this.data = data;
    this.type = characteristic[0]["type"];
    this.label = characteristic[0]["label"];
    this.borderColor = characteristic[0]["borderColor"];
    this.backgroundColor = characteristic[0]["backgroundColor"];
  } else {
    if (characteristic2 !== undefined) {
      console.log("GHGService characteristic !== undefined");

      this.data = data;
      this.type = characteristic2[0]["type"];
      this.label = characteristic2[0]["label"];
      this.borderColor = characteristic2[0]["borderColor"];
      this.backgroundColor = characteristic2[0]["backgroundColor"];
    }
  }
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

const responseApi = async (response, indicator, selectedCountry) => {
  var data = {};
  var labels = [];
  var datasets = [];
  var pathways = [];

  console.log("GHGService responseApi response: ", response);

  pathways = response.pathways;
  response = response.queryResponse;

  console.log("GHGService responseApi indicator: ", indicator);

  if (response.length !== 0) {
    switch (indicator) {
      case "methane_emissions_from_crops_and_livestock":
        var datasetContents = {};

        response.forEach((item) => {
          if (!labels.includes(item.Year)) {
            labels.push(item.Year);
          }

          // if (item.Year < 2025) {
          //   // HistMethane
          //   if (datasetContents["histmethanecropslivestock"] === undefined) {
          //     datasetContents["histmethanecropslivestock"] = [];
          //   }

          //   datasetContents["histmethanecropslivestock"].push(
          //     item.histmethanecropslivestock
          //   );
          // }

          // CalcCropCH4
          if (datasetContents["CalcCropCH4"] === undefined) {
            datasetContents["CalcCropCH4"] = [];
          }

          datasetContents["CalcCropCH4"].push(item.CalcCropCH4);

          // CalcLiveCH4
          if (datasetContents["CalcLiveCH4"] === undefined) {
            datasetContents["CalcLiveCH4"] = [];
          }

          datasetContents["CalcLiveCH4"].push(item.CalcLiveCH4);
        });

        if (selectedCountry === "") {
          var target_values = Array.from({ length: 11 }, (_, i) => null);

          const years = Array.from({ length: 11 }, (_, i) => 2000 + i * 5);

          const index = years.indexOf(2020);

          const sumCh4 =
            Number(datasetContents["CalcCropCH4"][index]) +
            Number(datasetContents["CalcLiveCH4"][index]);

          target_values[years.indexOf(2030)] = sumCh4 - 20;
          target_values[years.indexOf(2050)] = sumCh4 - 28;

          const dataset = new DatasetGHG("ghg_target_data", target_values);

          datasets.push(dataset);
        }

        for (var calcMetric in datasetContents) {
          var data = datasetContents[calcMetric];

          const dataset = new DatasetGHG(calcMetric.toLowerCase(), data);

          datasets.push(dataset);
        }

        var dataChart = {
          labels: labels,
          datasets: datasets,
        };

        break;

      case "annual_co2_emissions_from_land_use_change_and_on-farm_energy_use_by_source":
        var datasetContents = {};

        response.forEach((item) => {
          if (!labels.includes(item.Year)) {
            labels.push(item.Year);
          }

          // CalcCropCH4
          if (datasetContents["calccropco2"] === undefined) {
            datasetContents["calccropco2"] = [];
          }

          datasetContents["calccropco2"].push(item.calccropco2);

          // CalcLiveCH4
          if (datasetContents["calcalllandco2e"] === undefined) {
            datasetContents["calcalllandco2e"] = [];
          }

          datasetContents["calcalllandco2e"].push(item.calcalllandco2e);
        });

        if (selectedCountry === "") {
          var target_values = Array.from({ length: 11 }, (_, i) => null);

          const years = Array.from({ length: 11 }, (_, i) => 2000 + i * 5);

          const targetValue = -1.3;

          target_values[years.indexOf(2050)] = targetValue.toFixed(2);

          const dataset1 = new DatasetGHG("ghg_target_data", target_values);

          datasets.push(dataset1);
        }

        for (var calcMetric in datasetContents) {
          var data = datasetContents[calcMetric];

          const dataset = new DatasetGHG(calcMetric.toLowerCase(), data);

          datasets.push(dataset);
        }

        var dataChart = {
          labels: labels,
          datasets: datasets,
        };

        break;

      case "annual_ghg_emissions_from_crops_and_livestock_in_gt_co2e_by_country":
        var countryContents = {};

        console.log(
          "GHGService annual_ghg_emissions_from_crops_and_livestock_in_gt_co2e_by_country response: ",
          response
        );
        var cont = 0;
        response.forEach((item) => {
          if (!labels.includes(item.Year)) {
            labels.push(item.Year);
          }
          
          // if (item.Year < 2025 && cont<5) {
          //   // HistGHGCropsLivestock
          //   if (countryContents["histghgcropslivestock"] === undefined) {
          //     countryContents["histghgcropslivestock"] = [];
          //   }

          //   countryContents["histghgcropslivestock"].push(
          //     item.histghgcropslivestock
          //   );
          //   cont=cont+1;
          // }

          // sumallco2e
          if (countryContents[item.Country] === undefined) {
            countryContents[item.Country] = [];
          }

          countryContents[item.Country].push(item.sumallco2e);
        });

        for (var country in countryContents) {
          var countryData = countryContents[country];

          console.log(
            "GHGService annual_ghg_emissions_from_crops_and_livestock_in_gt_co2e_by_country country: ",
            country
          );
          console.log(
            "GHGService annual_ghg_emissions_from_crops_and_livestock_in_gt_co2e_by_country countryData: ",
            countryData
          );

          var dataset = new CountryDatasetGHG(country, countryData);

          datasets.push(dataset);
        }

        var dataChart = {
          labels: labels,
          datasets: datasets,
        };

        break;

      case "annual_co2_emissions_from_land_use_change_and_on-farm_energy_use_by_country":
        var countryContents = {};

        response.forEach((item) => {
          if (!labels.includes(item.Year)) {
            labels.push(item.Year);
          }

          // sumallco2e
          if (countryContents[item.Country] === undefined) {
            countryContents[item.Country] = [];
          }

          countryContents[item.Country].push(item.calcalllandco2e);
          
        });
        if (selectedCountry === "") {
          var target_values = Array.from({ length: 10 }, (_, i) => null);

          const years = Array.from({ length: 10 }, (_, i) => 2005 + i * 5);

          const targetValue = -1.3;

          target_values[years.indexOf(2050)] = targetValue.toFixed(2);

          const dataset = new DatasetGHG("ghg_target_data", target_values);
          datasets.push(dataset);
        }

        for (var country in countryContents) {
          var countryData = countryContents[country];

          console.log(
            "GHGService annual_co2_emissions_from_land_use_change_and_on-farm_energy_use_by_country country: ",
            country
          );
          console.log(
            "GHGService annual_co2_emissions_from_land_use_change_and_on-farm_energy_use_by_country countryData: ",
            countryData
          );

          var dataset = new CountryDatasetGHG(country, countryData);
          datasets.push(dataset);
        }

        var dataChart = {
          labels: labels,
          datasets: datasets,
        };

        break;

      case "cumulative_co2_emissions_from_afolu_2020-2050":
        var values = [];

        var targetGoal = null;
        var totalGHG = null;

        response.forEach((item) => {
          console.log("cumulative_co2_emissions_from_afolu_2020: item: ", item);

          // const columns = ["CalcCropCO2", "CalcAllLandCO2e", "histco2afolu"];
          // labels = ["CO2 from on-farm energy", "CO2 LUC", "HistCO2AFOLU"];

          const columns = ["CalcCropCO2", "CalcAllLandCO2e"];
          labels = ["CO2 from on-farm energy", "CO2 LUC"];
          
          for (var i = 0; i < columns.length; i++) {
            values.push(item[columns[i]]);
          }

          //  targetGoal = Number(item["C02Sum2020"]) - 40;
          targetGoal = 40;
        });

        console.log(
          "cumulative_co2_emissions_from_afolu_2020: values: ",
          values
        );

        console.log(
          "cumulative_co2_emissions_from_afolu_2020: targetGoal: ",
          targetGoal
        );

        var dataChart = {
          labels: labels,
          datasets: [
            {
              targetGoal,
              label: "cumulative_co2_emissions_from_afolu_2020",
              data: values,
              backgroundColor: [
                "rgb(116, 164, 188)",
                "rgb(66, 62, 59)",
                "rgb(255, 46, 0)",
                "rgb(255, 0, 255)",
              ],
              hoverOffset: 4,
            },
          ],
        };

        break;

      case "total_agricultural_emissions_2050":
        var values = [];

        var targetGoal = null;

        response.forEach((item) => {
          console.log("total_agricultural_emissions_2050: item: ", item);

          const columns = [
            "sumcalccropch4_2050",
            "sumcalccropn2o_2050",
            "sumcalccropco2_2050",
            "sumcalclivech4_2050",
            "sumcalcliven2o_2050",
          ];
          labels = [
            "CH4 from crops",
            "N2O from crops",
            "CO2 from on-farm energy use",
            "CH4 from livestock",
            "N2O from livestock",
          ];

          for (var i = 0; i < labels.length; i++) {
            values.push(item[columns[i]]);
          }

          //  targetGoal = Number(item["sumAll_2050"]) - 40;
          targetGoal = 4;
        });

        console.log("total_agricultural_emissions_2050: values: ", values);

        console.log(
          "total_agricultural_emissions_2050: targetGoal: ",
          targetGoal
        );

        var dataChart = {
          labels: labels,
          datasets: [
            {
              targetGoal,
              label: "total_agricultural_emissions_2050",
              data: values,
              backgroundColor: [
                "rgb(116, 164, 188)",
                "rgb(66, 62, 59)",
                "rgb(0,43,51)",
                "rgb(254, 168, 47)",
                "rgb(84, 72, 200)",
                "rgb(255, 46, 0)",
              ],
              hoverOffset: 4,
            },
          ],
        };

        break;
    }
  }

  var data = {
    Chart: dataChart,
    CSV: response,
    scenathonData: pathways,
  };

  console.log("GHGService response: ", data);
  return data;
};

export default function getGHG(target, indicator, props) {
  console.log("GHGService props.select.country: ", props.select.country);

  try {
    const url = `${target}/${indicator}/`;
    const query = `${process.env.REACT_APP_URL}${url}${JSON.stringify(props)}`;

    console.log("GHGService query: ", query);

    return fetch(query)
      .then((res) => {
        console.log("GHGService res 1: ", res);
        return res.json();
      })
      .then((res) => {
        console.log("GHGService res 2: ", res);
        return responseApi(res, indicator, props.select.country);
      });
  } catch (error) {
    console.error(error);
  }
}
