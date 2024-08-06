import React from "react";
import { Form } from "react-bootstrap";
import "../../css/index.css";

function ComboBoxFoodEnergy(props) {
	const { onChange } = props;
	return (
		<>
			<div>
			<h6 className="selectBoxTitle">Report</h6>
			<button 
			style={{ width: "200px", backgroundColor: "#F6F4F4" }}
			type="button" className="buttonCSV" onClick={props.onClick}>Export to CSV</button>
			</div>
		</>

	);
}
export default ComboBoxFoodEnergy;
