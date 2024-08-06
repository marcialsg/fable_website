import React, { useState } from "react";


const Dashboard = (props) =>  {
  const{metodo}=props
  const options = [
    "Global Target Summary",
    "Net Forest Cover Change(1)",
    "Net Forest Cover Change(2)",
    "Biodiversity",
    "Protected areas by type",
    "Land Cover",
    "Fresh water use (1)",
    "Fresh water use (2)",
    "GreenHouse Gas(GHG) Emissions(1)",
    "GreenHouse Gas(GHG) Emissions(2)",
    "Food energy intake per capita (1)",
    "Food energy intake per capita (2)"
  ];
  

  var [selectedOption, setSelectedOption] = useState(options[0]);

  
  return (

    <div className="Dashboard">      
      <select
        name='dashboard'
        value={selectedOption}
        onChange={(e) => {
        setSelectedOption(e.target.value);
        metodo(e);
        }}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <span>{selectedOption}</span>
    </div>
  )
}
export default Dashboard;