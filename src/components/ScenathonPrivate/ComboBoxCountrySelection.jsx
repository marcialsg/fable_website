import React from "react";
import "../../css/index.css";
import Typography from "@material-ui/core/Typography";

function ComboBoxCountrySelection(props) {
  // Your task is to find the index of a string in props.data that matches the string in props.defaultValue

  const getItemTypography = (text, color) => {
    return (
      <h2 className="body1Fable" style={{ textAlign: "center" }}>
        {text}
      </h2>
    );
  };

  let itemList = props.data.map((item, index) => {
    return (
      <option key={"" + index} value={item}>
        {item}
      </option>
    );
  });

  return (
    <div>
      {getItemTypography("Country and Regions", "black")}
      <div>
        <select
          style={{ width: "200px", backgroundColor: "#F6F4F4" }}
          className="selectBox"
          name="country_selection"
          onChange={props.onChange}
          value={props.defaultValue}
        >
          {itemList}
        </select>
      </div>
    </div>
  );
}

export default ComboBoxCountrySelection;
