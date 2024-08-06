import React from "react";
import "../../css/index.css";
import Typography from "@material-ui/core/Typography";

function ComboBoxProducts(props) {  
  
  const getItemTypography = (text, color) => {
    return (
<h2 className="body1Fable" style= {{textAlign : 'center' }}>{text}</h2>
    );
  };


  let items = props.data;

  let itemList = items.map((item, index) => {
    return <option key={index}>{item}</option>
  })

  return (
    <div>
    {getItemTypography("Product", "black")}
      
      <select
      style={{ width: "200px", backgroundColor: "#F6F4F4" }}
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