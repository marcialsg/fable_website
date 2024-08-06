import React from "react";

import Typography from "@material-ui/core/Typography";


const getItemTypography = (text, color) => {
  return (
<h2 className="body1Fable" style= {{textAlign : 'center' }}>{text}</h2>
  );
};

function ComboBoxTradeReportersImporters(props) {
  return (
    <>
      <div>
      {getItemTypography("Report", "black")}
        
        <button 
        style={{ width: "200px", backgroundColor: "#F6F4F4" }}
        type="button" className="buttonCSV" onClick={props.onClick}>
          Export to CSV
        </button>
      </div>
    </>
  );
}
export default ComboBoxTradeReportersImporters;
