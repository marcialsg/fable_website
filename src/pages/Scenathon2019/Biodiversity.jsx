import React, { useState, useEffect } from "react";
import BiodiversitySer from "../../services/Scenathon2019/BiodiversityService";
import ConvertToCSV from "../../components/ConvertToCSV";
import ComboBoxTradeAdjusment from "../../components/Scenathon2021/ComboBoxTradeAdjusment";
import MixedChart2Big from "../../components/Scenathon2019/MixedChart2Big";
import ComboBox from "../../components/ComboBox";
import FooterTxt from "../../components/FooterTxt";

//nfch=NetForestCoverChange
const DrawBiodiversity = () => {
  const [state, setState] = useState({
    select: {
      GraficaType: "group",
      scenathon_id: "5",
      iteration: "2",
      ScenathonYear: "2019",
    },
  });

  const [json, setJson] = useState([
    {
      labels: [],
      datasets: [],
      CSV: [],
    },
  ]);

  useEffect(() => {
    BiodiversitySer("biodiversityByCountry", state).then(setJson);
  }, [state]);

  const handleChange = (e) => {
    var group = state.select.GraficaType;
    var scenathon = state.select.scenathon_id;
    var iteration = state.select.iteration;
    var scenathonYear = state.select.ScenathonYear;
    var selectedValue = e.target.value;

    switch (e.target.name) {
      case "GraficaType":
        group = e.target.value;
        break;
    }

    setState({
      select: {
        GraficaType: group,
        scenathon_id: scenathon,
        iteration: iteration,
        ScenathonYear: scenathonYear,
        selectedValue: selectedValue,
      },
    });
  };

  const DownloadCSV = (e) => {
    ConvertToCSV(json.CSV);
  };
  return (
    <div>
      <div className="contenedor-selects">

        <ComboBox onChange={handleChange} onClick={DownloadCSV} />
      </div>
      <div
        className="graph"
        style={{
          display: "flex",
          flexDirection: "column",
          height: "35em",
          width: "65vw",
          margin: "auto",
        }}
      >
        <div className="biodiv-graph-wrapper">
          <div>
            <div style={{ textAlign: "left", height: "35em", width: "65vw" }}>
              <MixedChart2Big
                data={json}
                labelString="% of total land"
                title=""
                chartHeight={"35em"}
              />
              <FooterTxt
                txt={
                  "Share of forests plus non-managed non-forest land in total land area"
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DrawBiodiversity;
