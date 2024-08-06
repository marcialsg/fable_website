import React, { useState, useEffect } from "react";
import SuperGraphBig from "../../components/Scenathon2019/SuperGraphBig";
import ComboBox from "../../components/ComboBox";
import GreenHouseService from "../../services/Scenathon2019/GreenHouseService";
import ConvertToCSV from "../../components/ConvertToCSV";
import FooterTxt from "../../components/FooterTxt";

const DrawGreenhouse1 = () => {
  const [state, setState] = useState({
    select: {
      GraficaType: "group",
      iteration: "2",
      ScenathonYear: "2019",
      value: "",
    },
  });
  const [data, setdata] = useState({
    chartOne: [],
    charTwo: [],
  });

  useEffect(() => {
    GreenHouseService("GlobalghgEtarget", state).then(setdata);
  }, [state]);

  const handleChange = (e) => {
    var group = state.select.GraficaType;
    var scenathon = state.select.scenathon_id;
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
        scenathon_id: scenathon,
        iteration: iteration,
        ScenathonYear: scenathonYear,
      },
    });
  };

  const DownloadCSV = (e) => {
    ConvertToCSV(data.CSV);
    //
  };

  return (
    <div>
      <div className="contenedor-selects">

        <ComboBox onChange={handleChange} onClick={DownloadCSV} />
      </div>
      <div className="ghg-plots-grid">
        <div>
          <SuperGraphBig data={data.chartOne} title="" labelString="Gt CO2e" />
          <FooterTxt txt={"Annual GHG emissions from crops and livestock."} />
        </div>

        <div>
		<SuperGraphBig
                data={data.charTwo}
                title=""
                labelString="Gt CO2e"
              />
			              <FooterTxt
              txt={
                "Average annual GHG emissions from land use change and peat oxidation."
              }
            />
        </div>
      </div>

    </div>
  );
};

export default DrawGreenhouse1;
