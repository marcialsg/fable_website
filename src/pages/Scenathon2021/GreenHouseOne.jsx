import React, { useState, useEffect, Suspense } from "react";
import SuperGraph from "../../components/Scenathon2021/SuperGraph";
import ComboBox from "../../components/ComboBox";
import ComboBoxPathway from "../../components/Scenathon2021/ComboBoxPathway";
import GreenHouseService from "../../services/Scenathon2021/GreenHouseService";
import ConvertToCSV from "../../components/ConvertToCSV";
import ComboBoxTradeAdjusment from "../../components/Scenathon2021/ComboBoxTradeAdjusment";
import FooterTxt from "../../components/FooterTxt";
import Spinner from "../../components/Spinner";
import scenathonIterationsLabels from "../../data/scenathon_iterations_labels.json";

const DrawGreenhouse1 = (props) => {
  const getIterationsLabels = (iterations, scenathonId) => {
    const iterationsOptions =
      scenathonIterationsLabels[state.select.ScenathonYear]["scenathon_id"][
        scenathonId
      ]["iteration"];

    var iterationsLabels = [];

    iterations.forEach((element) => {
      for (const [key, value] of Object.entries(iterationsOptions)) {
        if (Number(element) === Number(key)) {
          iterationsLabels.push(<option value={key}>{value}</option>);
        }
      }
    });

    return iterationsLabels;
  };

  const getScenathonId = function (scenathon_label) {
    console.log(
      "GreenHouseOne getScenathonId scenathon_label: ",
      scenathon_label
    );

    for (var i = 0; i < Object.keys(tradeAdjustments).length; i++) {
      const iterationsKey = Object.keys(tradeAdjustments)[i];
      console.log("GreenHouseOne iterationsKey: ", iterationsKey);

      const itObject = tradeAdjustments[iterationsKey];
      console.log("GreenHouseOne itObject: ", itObject);

      const itLabel = itObject.label;
      console.log("GreenHouseOne itLabel: ", itLabel);

      if (itLabel === scenathon_label) {
        return "" + iterationsKey;
      }
    }
  };

  const [laoder, setLoader] = useState(false);
  const [state, setState] = useState({
    select: {
      GraficaType: "group",
      scenathon_id: props.year.scenathon_id,
      iteration: "1",
      ScenathonYear: props.year.year,
    },
  });

  const [data, setdata] = useState({
    chartOne: [],
    charTwo: [],
  });

  const [pathways, setPathways] = useState([]);
  const [tradeAdjustments, setTradeAdjustments] = useState([]);
  const [tradeAdjustmentsOptions, setTradeAdjustmentsOptions] = useState([]);

  useEffect(() => {
    // In means that the year has been changed
    setLoader(true);
    if (state.select.ScenathonYear !== props.year.year) {
      state.select.scenathon_id = props.year.scenathon_id;
      state.select.ScenathonYear = props.year.year;
    }

    GreenHouseService(state).then(function (value) {
      setdata(value);

      const pathwayOptions = [];
      for (var i = 0; i < Object.keys(value.TradeAdjustments).length; i++) {
        const iterationsKey = Object.keys(value.TradeAdjustments)[i];
        const iterationsValue = value.TradeAdjustments[iterationsKey];
        // console.log("FoodEnergyService iterationsKey: ", iterationsKey);
        // console.log("FoodEnergyService iterationsValue: \n", iterationsValue);

        pathwayOptions.push(iterationsValue.label);
      }

      setPathways(pathwayOptions);
      setTradeAdjustments(value.TradeAdjustments);

      const iterationsLabels = getIterationsLabels(
        Object.keys(
          value.TradeAdjustments[state.select.scenathon_id]["iterations"]
        ),
        state.select.scenathon_id
      );
      setTradeAdjustmentsOptions(iterationsLabels);
      setLoader(false);
    });
  }, [state, props]);

  const handleChange = async (e) => {
    var group = state.select.GraficaType;
    var scenathon = state.select.scenathon_id;
    var iteration = state.select.iteration;
    var scenathonYear = state.select.ScenathonYear;

    switch (e.target.name) {
      case "GraficaType":
        group = e.target.GraficaType;
        break;

      case "scenathon_id": //pathway
        scenathon = getScenathonId(e.target.value);
        iteration = Object.keys(tradeAdjustments[scenathon]["iterations"])[0];
        setTradeAdjustmentsOptions([]);
        break;

      case "iteration":
        iteration = e.target.value;
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

  var component = (
    <div className="ghg-plots-grid">
      <div>
        <SuperGraph data={data.chartOne} title="" labelString="Gt CO2e" />
        <FooterTxt txt={"Annual GHG emissions from crops and livestock."} />
      </div>

      <div>
        <SuperGraph data={data.charTwo} title="" labelString="Gt CO2e" />
        <FooterTxt
          txt={
            "Average annual GHG emissions from land use change and peat oxidation."
          }
        />
      </div>
    </div>
  );

  return (
    <div>
      <Suspense fallback={<Spinner />}>
        <div className="contenedor-selects">
          {/* <ComboBoxYear onChange={handleChange} /> */}
          <ComboBoxPathway onChange={handleChange} data={pathways} />
          <ComboBoxTradeAdjusment
            data={tradeAdjustmentsOptions}
            onChange={handleChange}
          />
          <ComboBox
            year={state.select.ScenathonYear}
            onChange={handleChange}
            onClick={DownloadCSV}
          />
        </div>
          {laoder ? (
            <div class="loader"></div>
          ) : data.chartOne.length === 0 || data.charTwo.length === 0 ? (
            <div>No values for the given input data</div>
          ) : (
            component
          )}
      </Suspense>
    </div>
  );
};

export default DrawGreenhouse1;
