import React from "react";
import "../css/index.css";
import Typography from "@material-ui/core/Typography";

var expanded = false;

function ComboBox(props) {

  
  const getItemTypography = (text, color) => {
    return (
<h2 className="body1Fable" style= {{textAlign : 'center' }}>{text}</h2>
    );
  };

  

  const [state, setState] = React.useState({ lande: "group" });
  const handleSelection = (e) => {
    setState({ lande: e.target.value });
    props.onChange(e);
  };

  let countrySelector = ( <div></div>) ;
  // Your task is to check if props.year is equal to '2021' and if it is, hide the countrySelector
 
  console.log("props.year: ");
  console.log(props.year);

  return (
    <>
      {countrySelector}
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
export default ComboBox;
