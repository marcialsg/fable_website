import ChartCharacteristics from "../../data/ChartCharacteristics.json";
import countries_characteristics from "../../data/countries_characteristics.json";

const responseApi = async (response, indicator, selectedCountry) => {
  var datasets = [];
  var labels = [];

  function CountryDatasetBiodiversity(nameCountry, data) {
    let characteristic = countries_characteristics[nameCountry];

    if (characteristic !== undefined) {
      this.data = data;
      this.type = characteristic[0]["type"];
      this.label = characteristic[0]["label"];
      this.borderColor = characteristic[0]["borderColor"];
      this.backgroundColor = characteristic[0]["backgroundColor"];
    }
  }

  function DatasetBiodiversity(calcMetric, data) {
    let characteristic = ChartCharacteristics[calcMetric];

    if (characteristic !== undefined) {
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
    }
  }

  console.log("BiodiversityService: response: ", JSON.stringify(response));
  var pathways = response.pathways;
  response = response.queryResponse;

  if (response.length !== 0) {
    switch (indicator) {
      case "cropland_area_under_agroecological_practices":
        var datasetContents = {};

        response.forEach((item) => {
          if (!labels.includes(item.year)) {
            labels.push(item.year);
          }
          // AgroecologicalPractices
          if (datasetContents["AgroecologicalPractices"] === undefined) {
            datasetContents["AgroecologicalPractices"] = [];
          }

          datasetContents["AgroecologicalPractices"].push(
            item.agroecologicalpractices
          );

          // NOTAgroecologicalPractices
          if (datasetContents["NOTAgroecologicalPractices"] === undefined) {
            datasetContents["NOTAgroecologicalPractices"] = [];
          }

          datasetContents["NOTAgroecologicalPractices"].push(
            item.notagroecologicalpractices
          );
        });

        if (selectedCountry === "") {
          var target_values = Array.from({ length: 11 }, (_, i) => null);

          const years = Array.from({ length: 11 }, (_, i) => 2000 + i * 5);

          const index = years.indexOf(2050);

          const sumAP =
            Number(datasetContents["AgroecologicalPractices"][index])+
            Number(datasetContents["NOTAgroecologicalPractices"][index]);

          target_values[years.indexOf(2050)] = (sumAP*0.50);

          const dataset = new DatasetBiodiversity("ghg_target_data", target_values);

          datasets.push(dataset);
        }

        for (var calcMetric in datasetContents) {
          const dataset = new DatasetBiodiversity(
            calcMetric.toLowerCase(),
            datasetContents[calcMetric]
          );

          datasets.push(dataset);
        }

        break;

      case "area_of_land_where_natural_processes_predominate":
        var datasetContents = {};

        response.forEach((item) => {
          if (!labels.includes(item.year)) {
            labels.push(item.year);
          }
          if (item.year < 2025) {
            if (datasetContents["histlnpp"] === undefined) {
              datasetContents["histlnpp"] = [];
            }

            datasetContents["histlnpp"].push(item.histlnpp);
          }

          // LNPPMatureForest
          if (datasetContents["LNPPMatureForest"] === undefined) {
            datasetContents["LNPPMatureForest"] = [];
          }

          datasetContents["LNPPMatureForest"].push(item.LNPPMatureForest);

          // LNPPMatureOtherLand
          if (datasetContents["LNPPMatureOtherLand"] === undefined) {
            datasetContents["LNPPMatureOtherLand"] = [];
          }

          datasetContents["LNPPMatureOtherLand"].push(item.LNPPMatureOtherLand);

          // LNPPNewForest
          if (datasetContents["LNPPNewForest"] === undefined) {
            datasetContents["LNPPNewForest"] = [];
          }

          datasetContents["LNPPNewForest"].push(item.LNPPNewForest);

          // LNPPNewOtherLand
          if (datasetContents["LNPPNewOtherLand"] === undefined) {
            datasetContents["LNPPNewOtherLand"] = [];
          }

          datasetContents["LNPPNewOtherLand"].push(item.LNPPNewOtherLand);
        });

        if (selectedCountry === "") {
          var target_values = Array.from({ length: 11 }, (_, i) => null);

          const years = Array.from({ length: 11 }, (_, i) => 2000 + i * 5);

          const index = years.indexOf(2020);

          const sumLNPP =
            Number(datasetContents["LNPPMatureForest"][index]) +
            Number(datasetContents["LNPPMatureOtherLand"][index])+
            Number(datasetContents["LNPPNewForest"][index])+
            Number(datasetContents["LNPPNewOtherLand"][index]);

          target_values[years.indexOf(2050)] = (sumLNPP*1.15);

          const dataset = new DatasetBiodiversity("ghg_target_data", target_values);

          datasets.push(dataset);
        }

        for (var calcMetric in datasetContents) {
          const dataset = new DatasetBiodiversity(
            calcMetric.toLowerCase(),
            datasetContents[calcMetric]
          );
          datasets.push(dataset);
        }
        break;

      case "biodiversity_by_country":
        var countryData = {};

        response.forEach((item) => {
          if (!labels.includes(item.year)) {
            labels.push(item.year);
          }

          if (countryData[item.Country] === undefined) {
            countryData[item.Country] = [];
          }

          countryData[item.Country].push(item.BiodiversityLand);
        });

        console.log(
          "BiodiversityService: countryData: ",
          JSON.stringify(countryData)
        );

        for (var country in countryData) {
          const dataset = new CountryDatasetBiodiversity(
            country,
            countryData[country]
          );
          datasets.push(dataset);
        }

        break;

      case "total_area_land_inside_protected_areas_or_other_effective_conservation_measures":
        var datasetContents = {};

        response.forEach((item) => {
          if (!labels.includes(item.year)) {
            labels.push(item.year);
          }
          if (item.year < 2025) {
            // histprotectedareas
            if (datasetContents["histprotectedareas"] === undefined) {
              datasetContents["histprotectedareas"] = [];
            }

            datasetContents["histprotectedareas"].push(
              item.histprotectedareas
            );
          }
          // ProtectedAreasForest
          if (datasetContents["ProtectedAreasForest"] === undefined) {
            datasetContents["ProtectedAreasForest"] = [];
          }

          datasetContents["ProtectedAreasForest"].push(
            item.ProtectedAreasForest
          );

          // ProtectedAreasOtherNat
          if (datasetContents["ProtectedAreasOtherNat"] === undefined) {
            datasetContents["ProtectedAreasOtherNat"] = [];
          }

          datasetContents["ProtectedAreasOtherNat"].push(
            item.ProtectedAreasOtherNat
          );

          // ProtectedAreasOther
          if (datasetContents["ProtectedAreasOther"] === undefined) {
            datasetContents["ProtectedAreasOther"] = [];
          }

          datasetContents["ProtectedAreasOther"].push(item.ProtectedAreasOther);

          // OECMAreas
          if (datasetContents["OECMAreas"] === undefined) {
            datasetContents["OECMAreas"] = [];
          }

          datasetContents["OECMAreas"].push(item.OECMAreas);
        });

        if (selectedCountry === "") {
          var target_values = Array.from({ length: 11 }, (_, i) => null);

          const years = Array.from({ length: 11 }, (_, i) => 2000 + i * 5);

          const index = years.indexOf(2030);

          const sumPA =
            Number(datasetContents["ProtectedAreasForest"][index]) +
            Number(datasetContents["ProtectedAreasOtherNat"][index]) +
            Number(datasetContents["ProtectedAreasOther"][index]) +
            Number(datasetContents["OECMAreas"][index]);

          target_values[years.indexOf(2030)] = (sumPA*0.30);

          const dataset = new DatasetBiodiversity("ghg_target_data", target_values);

          datasets.push(dataset);
        }

        for (var calcMetric in datasetContents) {
          const dataset = new DatasetBiodiversity(
            calcMetric.toLowerCase(),
            datasetContents[calcMetric]
          );

          datasets.push(dataset);
        }

        break;

      case "loss_of_forest":
        var datasetContents = {};
        var valueline = "";
        response.forEach((item) => {
          if (item.year == "2030") {
            valueline = item.CalcForest;
          }
        });
        response.forEach((item) => {
          if (!labels.includes(item.year)) {
            labels.push(item.year);
          }
          // CalcForest
          if (datasetContents["CalcForest"] === undefined) {
            datasetContents["CalcForest"] = [];
          }

          datasetContents["CalcForest"].push(item.CalcForest);

          // CalcNewForest
          // if (datasetContents["CalcNewForest"] === undefined) {
          //   datasetContents["CalcNewForest"] = [];
          // }

          // datasetContents["CalcNewForest"].push(item.CalcNewForest);
        });
        // var year = 2030;
        // var target_values = Array.from({ length: 11 }, (_, i) => null);

        // const years = Array.from({ length: 11 }, (_, i) => 2000 + i * 5);
        // for (let i = 0; i < 5; i++) {

        //   target_values[years.indexOf(year)] = valueline;
        //   year = year+5;
        // }
        // const dataset = new DatasetBiodiversity("2030_mature_forest_cover", target_values);
        //   datasets.push(dataset);

        for (var calcMetric in datasetContents) {
          const dataset = new DatasetBiodiversity(
            calcMetric.toLowerCase(),
            datasetContents[calcMetric]
          );

          datasets.push(dataset);
        }

        break;
    }
  }

  console.log("BiodiversityService: datasets: ", JSON.stringify(datasets));
  const data = {
    datasets: datasets,
    labels: labels,
    scenathonData: pathways,
  };

  return data;
};

export default function getBiodiversity(target, indicator, props) {
  try {
    const url = `${target}/${indicator}/`;
    const query = `${process.env.REACT_APP_URL}${url}${JSON.stringify(props)}`;

    return fetch(query)
      .then((res) => res.json())
      .then((res) => responseApi(res, indicator, props.select.country));
  } catch (error) {
    console.error(error);
  }
}
