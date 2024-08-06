import React, { useState, useEffect } from "react";
import BarChartBig from "../../components/BarChartBig";
import ComboBox from "../../components/ComboBox";
import ComboBoxPathway from "../../components/ScenathonPrivate/ComboBoxPathway";
import ProtectedAreaService from "../../services/ScenathonPrivate/ProtectedAreaService";
import ConvertToCSV from "../../components/ConvertToCSV";
import ComboBoxTradeAdjusment from "../../components/ScenathonPrivate/ComboBoxTradeAdjusment";
import ComboBoxCountrySelection from "../../components/ScenathonPrivate/ComboBoxCountrySelection";

const DrawProtected = (props) => {
  const getTradeAdjusments = function ({ iterations }) {
    const tradeAdjustmentsList = [];

    console.log("ProtectedAreaByType getTradeAdjusments: ", iterations);

    for (var i = 0; i < Object.keys(iterations).length; i++) {
      const iterationsLabel = Object.keys(iterations)[i];

      tradeAdjustmentsList.push(iterationsLabel);
    }

    console.log(
      "ProtectedAreaByType tradeAdjustmentsList: ",
      tradeAdjustmentsList
    );

    return tradeAdjustmentsList;
  };

  const getScenathonId = function (scenathon_label) {
    console.log(
      "ProtectedAreaByType getScenathonId scenathon_label: ",
      scenathon_label
    );

    for (var i = 0; i < Object.keys(tradeAdjustments).length; i++) {
      const iterationsKey = Object.keys(tradeAdjustments)[i];
      console.log("ProtectedAreaByType iterationsKey: ", iterationsKey);

      const itObject = tradeAdjustments[iterationsKey];
      console.log("ProtectedAreaByType itObject: ", itObject);

      const itLabel = itObject.label;
      console.log("ProtectedAreaByType itLabel: ", itLabel);

      if (itLabel === scenathon_label) {
        return "" + iterationsKey;
      }
    }
  };

  const [state, setState] = useState({
    select: {
      GraficaType: "group",
      scenathon_id: props.year.scenathon_id,
      iteration: "1",
      ScenathonYear: props.year.year,
      country: ""
    },
  });

  const [json, setJson] = useState([
    {
      labels: [],
      datasets: [],
      CSV: [],
      Pathways: [],
      Countries: [],
    },
  ]);

  const [countries, setCountries] = useState([]);
  const [pathways, setPathways] = useState([]);
  const [tradeAdjustments, setTradeAdjustments] = useState([]);
  const [tradeAdjustmentsOptions, setTradeAdjustmentsOptions] = useState([]);

  useEffect(() => {
    // In means that the year has been changed
    if (state.select.ScenathonYear !== props.year.year) {
      state.select.scenathon_id = props.year.scenathon_id;
      state.select.ScenathonYear = props.year.year;
    }

    ProtectedAreaService(state).then(function (value) {
      console.log("ProtectedAreaByType useEffect value: ", value);

      const countryOptions = ["All Countries"];

      value.Countries.forEach((element) => {
        countryOptions.push(element);
      });

      setCountries(countryOptions);
      setJson(value);
      setPathways(value.Pathways);
      setTradeAdjustments(value.TradeAdjustments);
      setTradeAdjustmentsOptions(
        getTradeAdjusments(value.TradeAdjustments[state.select.scenathon_id])
      );
    });
  }, [state, props]);

  const handleChange = async (e) => {
    var group = state.select.GraficaType;
    var scenathon = state.select.scenathon_id;
    var iteration = state.select.iteration;
    var scenathonYear = state.select.ScenathonYear;
    var country = state.select.country;

    switch (e.target.name) {
      case "country_selection":
        country = e.target.value;

        if (country == "All Countries") {
          country = "";
        }

        break;

      case "GraficaType":
        group = e.target.value;
        break;
      case "scenathon_id": //pathway
        scenathon = getScenathonId(e.target.value);

        break;
      case "iteration":
        iteration = e.target.value;
        country = ""
        setCountries([])
        break;
      case "ScenathonYear":
        scenathonYear = e.target.value;

        switch (scenathonYear) {
          case "2021":
            scenathon = "7";
            break;

          case "2020":
            scenathon = "5";
            break;
        }

        iteration = "1";
        //TODO: update THE OTHER COMBOBOXES
        break;
    }

    setState({
      select: {
        GraficaType: group,
        scenathon_id: scenathon,
        iteration: iteration,
        ScenathonYear: scenathonYear,
        country: country
      },
    });
  };

  return (
    <div>
      <div className="contenedor-selects">
        <div style={{ marginRight: "auto" }}></div>
        {/* <ComboBoxYear onChange={handleChange} /> */}
        <ComboBoxCountrySelection data={countries} onChange={handleChange} />
        <ComboBoxPathway onChange={handleChange} data={pathways} />
        <ComboBoxTradeAdjusment
          data={tradeAdjustmentsOptions}
          onChange={handleChange}
        />
      </div>
      <div className="graph">
        <div>
          <div>
            <div
              className="graph-wrapper"
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "left",
                height: "35em",
                width: "65vw",
              }}
            >
              <BarChartBig
                data={json}
                labelString="1000 ha"
                title=""
                chartHeight={"35em"}
                chartWidth={"65vw"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrawProtected;
