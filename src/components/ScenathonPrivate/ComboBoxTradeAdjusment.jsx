import React, { useState, useEffect } from "react";
// import "../css/index.css";


function ComboBoxTradeAdjusment(props) {

  console.log("ComboBoxTradeAdjusment props", props);

  let itemList = props.data.map(item => {
    return <option value={item}>{item}</option>
  })

  console.log('getTradeAdjustmentList itemList: ', itemList);

  return (
    <div>
      <h6 className="selectBoxTitle">Iteration</h6>
      <select
        // defaultValue={props.default}
        placeholder={props.default}
        className="selectBox"
        name="iteration"
        onChange={props.onChange}
      >

        {itemList}

      </select>
    </div>
  );

}

export default ComboBoxTradeAdjusment;
