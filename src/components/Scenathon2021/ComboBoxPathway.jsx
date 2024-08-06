import React from "react";
import "../../css/index.css";
import Typography from "@material-ui/core/Typography";

function ComboBoxPathWay(props) {

  
  const getItemTypography = (text, color) => {
    return (
<h2 className="body1Fable" style= {{textAlign : 'center' }}>{text}</h2>
    );
  };


  console.log("ComboBoxPathWay!!");
  console.log("props: ", props);

  let items = props.data;

  let itemList = items.map(item => {
    return <option value={item}>{item}</option>
  })

  return (
    <div>
      {/* <h6 className="selectBoxTitle">Pathway</h6> */}
      {getItemTypography("Pathway", "black")}
      <select
      style={{ width: "200px", backgroundColor: "#F6F4F4" }}
        className="selectBox"
        name="scenathon_id"
        onChange={props.onChange}
      >
        
        {itemList}

      </select>
    </div>
  );

}

export default ComboBoxPathWay;