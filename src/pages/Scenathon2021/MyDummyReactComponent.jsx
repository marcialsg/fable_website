import React, { useState, useEffect } from 'react';
import MyDummyService from "../../services/Scenathon2021/MyDummyService";

const Example = () => {

  const [state, setState] = useState({
    select: {
      GraficaType: "group",
      scenathon_id: "7",
      Iteration: "after",
      ScenathonYear: "2021"
    }   
});

  const [json, setJson] = useState([
    {
      Chart: [],
      CSV: [],
    },
  ]);

  useEffect(() => {
    MyDummyService(state).then(setJson);
  }, [state]);

  // const [count, setCount] = useState(0);

  // // Similar to componentDidMount and componentDidUpdate:
  // useEffect(() => {
  //   // Update the document title using the browser API
  //   document.title = `You clicked ${count} times`;
  // });

  return (
    <div>
      <p></p>
      {/* <button onClick={() => setCount(count + 1)}> */}
      <button onClick={() => 
        setState({
          select: {
            // GraficaType: group,
            // scenathon_id: scenathon,
            // Iteration: iteration,
            // ScenathonYear: scenathonYear
          }
        })}>
        Click me
      </button>
    </div>
  );
}

export default Example;