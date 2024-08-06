import React, { Component } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import ActionBtnRenderer from './ActionBtnRenderer.jsx';
import "../css/index.css";
import 'ag-grid-community/dist/styles/ag-grid.css';



class GridTable extends Component {
  state = {
    searchValue: ""
  };

  onChange = e => {
    this.setState(
      {
        searchValue: e.target.value
      },
      () => {
        this.gridApi.setQuickFilter(this.state.searchValue);
        console.log("123 ", this.state.columnDefs);
      }
    );
  };
  constructor(props) {
    super(props);
    this.data=props.data
   this.columns = this.props.columns;
 
    this.state = {
      columnDefs: this.columns,
        
      frameworkComponents: {
        ActionBtnRenderer: ActionBtnRenderer,
      },
      defaultColDef: { resizable: true },

      rowData: props.data

    };



  }



  onGridReady(params) {
 
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    var that = this;
    
    that.setState({
      rowData: that.props.data
    });
  
    

  }

  sizeToFit() {
    this.gridApi.sizeColumnsToFit();
  }
  autoSizeAll() {
    var allColumnIds = [];
    this.gridColumnApi.getAllColumns().forEach(function(column) {
      allColumnIds.push(column.colId);
    });
    this.gridColumnApi.autoSizeColumns(allColumnIds);
  }

 

  getSelectedRowData = () => {
    let selectedNodes = this.gridApi.getSelectedNodes();
    let selectedData = selectedNodes.map(node => node.data);
    alert(`Selected Nodes:\n${JSON.stringify(selectedData)}`);
    return selectedData;
  };


  render() {
   
  
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div class="grid-wrapper">
          <div
            id="myGrid"
            style={{
              boxSizing: "border-box",
              height: "100%",
              width: "100%"
            }}
            className="ag-theme-balham"
          >
               <input
            type="text"
            value={this.state.value}
            onChange={this.onChange}
          />
            {this.props.data!==undefined?<AgGridReact
              rowModelType="clientSide"
              columnDefs={this.state.columnDefs}
              enableColResize={true}
              onGridReady={this.onGridReady.bind(this)}
              rowData={this.state.rowData}
              onRowSelected={this.getSelectedRowData}
              rowSelection={ 'multiple'}
              frameworkComponents={this.state.frameworkComponents}

            />:null
          }
           
          </div>
        </div>

       
        
      </div>
    );
  }
}



export default GridTable;