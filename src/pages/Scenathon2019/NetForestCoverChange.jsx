import React, { useState, useEffect } from "react";
import MixedChart from "../../components/Scenathon2019/MixedChart.jsx";
import ComboBox from "../../components/ComboBox";
import NetForestCoverService from "../../services/Scenathon2019/NetForestCoverService";
import ConvertToCSV from "../../components/ConvertToCSV";
import "../../css/index.css";

const DrawNfch = () => {
  const [state, setState] = useState({
    select: {
      GraficaType: "group",
      iteration: "2",
      ScenathonYear: "2019",
    },
  });

  const handleChange = (e) => {
    var group = state.select.GraficaType;
    var iteration = state.select.iteration;
    var scenathonYear = state.select.ScenathonYear;

    switch (e.target.name) {
      case "GraficaType":
        group = e.target.value;
        break;
    }

    setState({
      select: {
        GraficaType: group,
        iteration: iteration,
        ScenathonYear: scenathonYear,
      },
    });
  };

  const [json, setJson] = useState([
    {
      labels: [],
      datasets: [],
      CSV: [],
    },
  ]);

  useEffect(() => {
    NetForestCoverService("wNetForesCoverChange", state).then(setJson);
  }, [state]);

  const DownloadCSV = (e) => {
    ConvertToCSV(json.CSV);
  };

  return (
    <div>
      <div className="contenedor-selects">
        <ComboBox onChange={handleChange} onClick={DownloadCSV} />
      </div>

      <div className="protected-graph-wrapper">
        <div>
          <div style={{ textAlign: "left", height: "35em", width: "65vw" }}>
            <MixedChart
              data={json}
              labelString="1000 ha Per 5 Years"
              // title=" "
              chartHeight={"35em"}
            />
            <p className="gCaption">
              Cumulated forest loss due to crop, pasture and urban area
              expansion and forest gain due to afforestation per million
              hectares per 5 year period (e.g. 2005 corresponds to 2001-2005).
              <a
                href="https://datastudio.google.com/u/0/reporting/77705208-e149-4507-a419-63ddbef26a63/page/uBsMB"
                rel="noreferrer"
                target="_blank"
              >
                {" "}
                Global Forest Watch (GFW){" "}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrawNfch;
