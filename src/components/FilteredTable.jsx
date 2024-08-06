import GridTable from "../components/GridTable";

const FilteredTable = (props) => {



      return (
        <div
          className="ag-theme-balham"
          style={{
            height: "500px",
            width: "600px"
          }}
        >
        
          <GridTable
            data={props.data}


          />
        </div>
      );


  }

  export default FilteredTable;