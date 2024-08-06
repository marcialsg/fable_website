import React from "react";
import "../../css/index.css";
function ComboBoxPathWay(props) {
  return (
    <div>
      <h6 className="selectBoxTitle">Pathway</h6>
      <select
        className="selectBox"
        name="scenathon_id"
        onChange={props.onChange}>
        <option value="15">Shock</option>
        <option value="16">Current trend</option>
        <option value="17">SolyTrade</option>
        <option value="18">Declaration</option>
      </select>
    </div>
  );
}

export default ComboBoxPathWay;
