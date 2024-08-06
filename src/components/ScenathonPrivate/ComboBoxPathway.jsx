import React from "react";
import "../../css/index.css";
function ComboBoxPathWay(props) {

  console.log("ComboBoxPathWay!!");
  console.log("props: ", props);

  let items = props.data;

  let itemList = items.map(item => {
    return <option value={item}>{item}</option>
  })

  return (
    <div>
      <h6 className="selectBoxTitle">Pathway</h6>
      <select
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