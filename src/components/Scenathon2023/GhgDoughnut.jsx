import { Doughnut } from "react-chartjs-2";

const GhgDoughnut = (props) => {
  console.log("GhgDoughnut props: ", props);

  const myData = props.data;
  const goal = props.target;

  var total = 0
  var g = goal
  var cont = 0
  var toNumber = 0
  if (myData.datasets.length > 0) {
    for (let i = 0; i < myData.datasets[0].data.length; i++) {
      toNumber = Number(myData.datasets[0].data[i]);
      total += toNumber;
      console.log("toNumber: ", toNumber);
      cont = cont +1;
    }
  }

  var color = "#A22522"; //red
  var shadowColor = "#f1bdbc"; //red
  console.log("total: ", total);
  console.log("cont: ", cont);
  console.log("GhgDoughnut total: ", total);
  console.log("GhgDoughnut goal: ", goal);

  if (total < goal) {
    color = "#56c02b"; //green
    shadowColor = "#97E17A"; //red
  }

  total = total.toFixed(2);
  g = g.toFixed(2);


  if (props.targetUnits == "") {
    total = null;
  }

  const component = (
    <div style={{ position: "relative", width: "100%" }}>
      <div
        style={{
          position: "absolute",
          top: "45%",
          width: "100%",
          textAlign: "center",
        }}
      >
        
        <h1
          style={{
            fontFamily: "proxima-nova, sans-serif",
            lineHeight: 1.5,
            fontStyle: "bold",
            fontSize: "2em",
            color: color,
          }}
        >
          {total}
        </h1>

        <h2
          style={{
            fontSize: "1em",
            lineHeight: 1.5,
            fontStyle: "bold",
            color: shadowColor,
          }}
        >
          {props.targetUnits}
        </h2>
        
      </div>
      <div
        style={{
          position: "absolute",
          top: "39.5%",
          width: "100%",
          left: "35%",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "1em",
            lineHeight: 1.5,
            fontStyle: "bold",
            color: "black",
          }}
        >
          {"Target"}
        </h2>
        <h1
          style={{
            fontFamily: "proxima-nova, sans-serif",
            lineHeight: 1.5,
            fontStyle: "bold",
            fontSize: "2em",
            color: color,
          }}
        >
          {g}
        </h1>

        <h2
          style={{
            fontSize: "1em",
            lineHeight: 1.5,
            fontStyle: "bold",
            color: shadowColor,
          }}
        >
          {props.targetUnits}
        </h2>
        
      </div>

      <Doughnut
        options={{
          legend: {
            display: props.display === undefined ? true : props.display,
            labels: {
              boxWidth: props.labelwidth === undefined ? 20 : props.labelwidth,
              fontColor:
                props.fontColor === undefined ? "black" : props.fontColor,
              fontSize: props.fontSize === undefined ? 18.2 : props.fontSize,
              fontFamily: "proxima-nova, sans-serif",
              lineHeight: 1.5,
              padding: 8,
            },
          },
          tooltips: {
            mode: "index",
          },
        }}
        style={{
          position: "relative",
          top: "50%",
          left: "50%",
        }}
        data={myData}
      />
    </div>
  );

  return component;
};
export default GhgDoughnut;
