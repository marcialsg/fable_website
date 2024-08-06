import React from "react";
import { Form } from "react-bootstrap";
import "../../css/index.css";

function ComboBoxFoodEnergy(props) {
	const { onChange } = props;
	return (
		<>
			{/* <div>
			<h6 className="selectBoxTitle">Year</h6>
				<Form>
					<select className="selectBox" name="Year" onChange={onChange}>
						<option value="" disabled selected hidden>
						2030
						</option>
						<option value="2000">2000</option>
						<option value="2005">2005</option>
						<option value="2010">2010</option>
						<option value="2015">2015</option>
						<option value="2020">2020</option>
						<option value="2025">2025</option>
						<option value="2030">2030</option>
						<option value="2035">2035</option>
						<option value="2040">2040</option>
						<option value="2045">2045</option>
						<option value="2050">2050</option>
					</select>
				</Form>
			</div> */}
			<div>
			<h6 className="selectBoxTitle">Report</h6>
			<button type="button" className="buttonCSV" onClick={props.onClick}>Export to CSV</button>
			</div>
		</>

	);
}
export default ComboBoxFoodEnergy;
