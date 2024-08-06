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

function DatasetNitrogenAndPhosphorus(calcMetric, data, stack_no) {
  let characteristic = ChartCharacteristics[calcMetric];

  if (characteristic !== undefined) {
    console.log("NitrogenAndPhosphorusService characteristic !== undefined");

    this.data = data;
    this.type = characteristic[0]["type"];
    this.label = characteristic[0]["label"];
    this.borderColor = characteristic[0]["borderColor"];
    this.backgroundColor = characteristic[0]["backgroundColor"];
    this.stack = stack_no;
  } else {
    console.log("NitrogenAndPhosphorusService characteristic === undefined");
  }
}

const responseApi = async (response, indicator, selectedCountry) => {
  var datasets = [];
  var labels = [];

  console.log("NitrogenAndPhosphorusService response: ", response);

  const stacks = {
    sumcalcn_agsoils: "Stack 1",
    sumcalcn_leftpasture: "Stack 1",
    sumhistnorg: "Stack 2",
    sumhistnsynth: "Stack 2",
    sumcalcn_synth: "Stack 1",
    sumtotalp: "Stack 2",
  };

  var pathways = response.pathways;
  response = response.queryResponse;

  if (response.length !== 0) {
    switch (indicator) {
      case "nitrogen_application":
        var datasetContents = {};

        response.forEach((item) => {
          if (!labels.includes(item.year)) {
            labels.push(item.year);
          }

          // if (item.year < 2025) {
          //   //histnitrogen
          //   if (datasetContents["histnitrogen"] === undefined) {
          //     datasetContents["histnitrogen"] = [];
          //   }

          //   datasetContents["histnitrogen"].push(item.histnitrogen);
          // }

          // //sumhistnorg
          // if (datasetContents["sumhistnorg"] === undefined) {
          //   datasetContents["sumhistnorg"] = [];
          // }

          // datasetContents["sumhistnorg"].push(item.sumhistnorg);

          //sumhistnsynth
          if (datasetContents["sumcalcn_synth"] === undefined) {
            datasetContents["sumcalcn_synth"] = [];
          }

          datasetContents["sumcalcn_synth"].push(item.sumcalcn_synth);

          // sumcalcnorg
          if (datasetContents["sumcalcn_agsoils"] === undefined) {
            datasetContents["sumcalcn_agsoils"] = [];
          }

          datasetContents["sumcalcn_agsoils"].push(item.sumcalcn_agsoils);

          // sumcalcnsynth
          if (datasetContents["sumcalcn_leftpasture"] === undefined) {
            datasetContents["sumcalcn_leftpasture"] = [];
          }

          datasetContents["sumcalcn_leftpasture"].push(item.sumcalcn_leftpasture);
        });

        if (selectedCountry === "") {
          const nitrogenTarget = Array.from({ length: 11 }, (_, i) => 68);
          var target_values = Array.from({ length: 11 }, (_, i) => null);
          const years = Array.from({ length: 11 }, (_, i) => 2000 + i * 5);
          target_values[years.indexOf(2050)] = 68;
          datasets.push(
            new DatasetNitrogenAndPhosphorus("ghg_target_data", target_values)
          );
        }

        for (var calcMetric in datasetContents) {
          const dataset = new DatasetNitrogenAndPhosphorus(
            calcMetric.toLowerCase(),
            datasetContents[calcMetric],
            stacks[calcMetric]
          );

          datasets.push(dataset);
        }

        break;

      case "phosphorus_application":
        var datasetContents = {};

        response.forEach((item) => {
          // console.log("NitrogenAndPhosphorusService item: ", item);
          if (!labels.includes(item.year)) {
            labels.push(item.year);
          }

          // if (item.year < 2025) {
          //   //histnitrogen
          //   if (datasetContents["histphosphorous"] === undefined) {
          //     datasetContents["histphosphorous"] = [];
          //   }

          //   datasetContents["histphosphorous"].push(item.histphosphorous);
          // }

          //sumhistp
          if (datasetContents["sumhistp"] === undefined) {
            datasetContents["sumhistp"] = [];
          }

          datasetContents["sumhistp"].push(item.sumhistp);

          //sumtotalp

          if (datasetContents["sumtotalp"] === undefined) {
            datasetContents["sumtotalp"] = [];
          }

          datasetContents["sumtotalp"].push(item.sumtotalp);
        });

        if (selectedCountry === "") {
          const phosphorusTarget = Array.from({ length: 11 }, (_, i) => 16000);
          var target_values = Array.from({ length: 11 }, (_, i) => null);
          const years = Array.from({ length: 11 }, (_, i) => 2000 + i * 5);
          target_values[years.indexOf(2050)] = 16000;
          datasets.push(
            new DatasetNitrogenAndPhosphorus("ghg_target_data", target_values)
          );
        }

        console.log(
          "NitrogenAndPhosphorusService datasetContents[sumtotalp]: ",
          datasetContents["sumtotalp"]
        );
        for (var calcMetric in datasetContents) {
          const dataset = new DatasetNitrogenAndPhosphorus(
            calcMetric.toLowerCase(),
            datasetContents[calcMetric],
            stacks[calcMetric]
          );

          datasets.push(dataset);
        }

        break;
    }
  }

  const data = {
    labels: labels,
    datasets: datasets,
    CSV: response,
    scenathonData: pathways,
  };

  console.log("NitrogenAndPhosphorusService data: ", data);

  return data;
};

export default function getNitrogenAndPhosphorus(target, indicator, props) {
  try {
    const url = `${target}/${indicator}/`;
    const query = `${process.env.REACT_APP_URL}${url}${JSON.stringify(props)}`;
    console.log("NitrogenAndPhosphorusService query: ", query);
    return fetch(query)
      .then((res) => res.json())
      .then((res) => responseApi(res, indicator, props.select.country));
  } catch (error) {
    console.error(error);
  }
}
