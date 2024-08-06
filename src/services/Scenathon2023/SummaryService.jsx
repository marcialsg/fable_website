var target_data = require("../../assets/2023_target_data_summary.json");
var sdg_data = require("../../data/sdgsummary.json");

const responseApi = async (response) => {
  var datasets = [];
  var labels = [];

  var datasetContents = {};
  
  response = response.queryResponse;

  if (response.length !== 0) {
    response.forEach((item) => {
      // console.log("SummaryService item: ", item);

      if(item.domain !== ""){
        if (datasetContents[item.domain] === undefined) {
          datasetContents[item.domain] = {};
        }
  
        if (datasetContents[item.domain]["indicators"] === undefined) {
          datasetContents[item.domain]["indicators"] = [];
        }
  
        const indicator = {
          indicator: item.indicator,
          currenttrends: item.currenttrends,
          nationalcommitments: item.nationalcommitments,
          globalsustainability: item.globalsustainability
        };

        datasetContents[item.domain]["indicators"].push(indicator);
  
        target_data["target_data"].forEach((target) => {
          if (target.targetDomain === item.domain) {
            sdg_data.forEach((sdg) => {
              console.log("Aqui esta el domain: "+item.domain);
              if (Number(sdg.goal -1) === Number(target.sdg)) {
                datasetContents[item.domain]["color"] = sdg.colorInfo.hex;
              }
            });
          }
        });
      }

    });

    return datasetContents;
  }
};

export default function getSummary() {
  try {
    const url = `summary`;
    const query = `${process.env.REACT_APP_URL}${url}`;
    console.log("SummaryService query: ", query);

    return fetch(query)
      .then((res) => res.json())
      .then((res) => responseApi(res));
  } catch (error) {
    console.error(error);
  }
}
