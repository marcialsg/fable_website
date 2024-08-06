import React from "react";
import "../css/index.css";
import { HashRouter as Router, Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

function ComboBoxYear(props) {
  // console.log("ComboBoxYear clicked");
  // console.log("ComboBoxYear props.defaultValue: ", props.defaultValue);

  const getItemTypography = (text, color) => {
    return (
      <div style={{ marginLeft: "8px" }}>

<h2 className="body1Fable" style= {{textAlign : 'center', color }}>{text}</h2>

      </div>
    );
  };

  const getSubitemTypography = (text, color) => {
    return (
<h2 className="body1Fable" style= {{marginRight: "8px", textAlign : 'center', color }}>{text}</h2>
    );
  };

  const years = {
    2019: "/pgepublicscen19",
    2020: "/pgepublicscen20",
    2021: "/pgepublicscen21",
    2023: "/pgepublicscen23"
  };

  let itemList = Object.keys(years).map((key) => {
    let colorSelection = "#e4e4e4";

    // console.log("ComboBoxYear key: ", key);
    console.log("ComboBoxYear props.defaultValue: ", props.defaultValue);

    if (key === props.defaultValue) {
      colorSelection = "#03203d";
    }

    // console.log("ComboBoxYear colorSelection: ", colorSelection);

    return (
      <Link
        className="yearsLabelClass"
        // style={{ color: colorSelection }}
        to={years[key]}
      >
        {getSubitemTypography(key, colorSelection)}
      </Link>
    );
  });

  return (
    <div style={{ width: "360px" }}>
      <div className="yearComboBox_container">
        <div className="current_yearComboBox_container">
          {getItemTypography("Scenathon Year:", "white")}
          <div style={{ marginLeft: "1em" }}></div>
          {getItemTypography("  " + props.defaultValue, "#cddc39")}
        </div>

        <div>
            <div className="year_combobox_options_container">{itemList}</div>
        </div>
      </div>
    </div>
  );
}

export default ComboBoxYear;
