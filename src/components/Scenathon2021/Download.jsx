import React from 'react';
import '../css/index.css';



function Download(props) {

    return (

        <div className="contenedor-selects">
            <div>
                <h6 className="selectBoxTitle">Report</h6>
                <button type="button" className="buttonCSV" onClick={props.onClick}>Export to CSV</button>
            </div>

        </div>

    )




}
export default Download;