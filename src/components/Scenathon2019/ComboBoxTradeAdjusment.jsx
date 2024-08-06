import React, { useState, useEffect } from "react";
// import "../css/index.css";


function ComboBoxTradeAdjusment(props) {
  // let items = props.data;

  // let itemList = items.map((item, index) => {
  //   return <option key={index}>{item}</option>
  // })

  return (
    <div>
    <h2 className="body1Fable" style= {{textAlign : 'center' }}>Trade Adjustment</h2>
      
      <select
      style={{ width: "200px", backgroundColor: "#F6F4F4" }}
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
