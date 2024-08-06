import React from "react";
import "../css/index.css";
function ComboBoxTradeAdjusment2(props) {
  return (
    <div>
      <h6 className="selectBoxTitle">Iteration</h6>
      <select className="selectBox" name="Iteration" onChange={props.onChange}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
    </div>
  );
}

export default ComboBoxTradeAdjusment2;
