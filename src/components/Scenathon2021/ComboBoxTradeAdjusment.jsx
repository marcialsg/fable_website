import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";

function ComboBoxTradeAdjusment(props) {
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
      {getItemTypography("Trade adjustment", "black")}
      <select
        style={{ width: "200px", backgroundColor: "#F6F4F4" }}
        placeholder={props.default}
        className="selectBox"
        name="iteration"
        onChange={props.onChange}
      >
        {props.data}
      </select>
    </div>
  );
}

export default ComboBoxTradeAdjusment;
