import React from "react";
import "../../css/index.css";
function ComboBoxProducts(props) {

  let items = props.data;

  let itemList = items.map((item, index) => {
    return <option key={index}>{item}</option>
  })

  return (
    <div>
      <h6 className="selectBoxTitle">Product</h6>
      <select
        className="selectBox"
        name="product"
        onChange={props.onChange}
      >
        
        {itemList}

      </select>
    </div>
  );


}

export default ComboBoxProducts;