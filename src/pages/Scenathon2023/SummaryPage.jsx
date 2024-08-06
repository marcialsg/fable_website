import React, { Suspense, useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import TargetSummaryAccordionToggle from "../../components/TargetSummaryAccordionToggle";
import SummaryService from "../../services/Scenathon2023/SummaryService";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";

// import { food, biodiversity, ghg } from "../../data/targetSummary";

import "../../css/index.css";

const SummaryPage = (props) => {

  const getItemTypography = (text) => {
    return (
  <h2 className="subtitleFable">{text}</h2>
    );
  };
  console.log("SummaryPage props: ", props);

  const [targets, setTargets] = useState(null);

  const [loader, setLoader] = useState(false);

  var [selectionIndexes, setSelectionIndexes] = useState({
    targetIndex: 0,
    indicatorIndex: 0,
  });

  useEffect(() => {
    // console.log("SummaryPage useEffect !!");
    setLoader(true);

    SummaryService().then(function (value) {
      console.log("SummaryPage returned SummaryService value: ", value);

      //iterate over the returned value. It is an object with different keys.
      var listOfTargets = [];

      const targetOrder = [
        "Food security",
        "Biodiversity",
        "Climate Change Mitigation",
        "Freshwater, Nitrogen and Phosphorus",
      ];

      for (var i = 0; i < targetOrder.length; i++) {
        var target = {};
        target.domain = targetOrder[i];
        target.indicators = value[target.domain].indicators;
        target.color = value[target.domain].color;
        // console.log("SummaryPage target: ", target);

        var targetListItem = (
          <ListItem
            // selected={selectionIndexes.targetIndex === i}
            onClick={(event) => {
              setSelectionIndexes({
                targetIndex: i,
              });
            }}
          >
            <div style={{ width: "100%" }}>
              <TargetSummaryAccordionToggle targets={target} />
            </div>
          </ListItem>
        );

        listOfTargets.push(targetListItem);
      }

      setTargets(listOfTargets);

      setLoader(false);
    });
  }, [props]);

  let component = (
    <div>
      
      <List>{targets}</List>
    </div>
  );

  return (
    <div>
      {getItemTypography("Do we meet our targets?")}
      {loader ? (
        <div class="loader"></div>
      ) : targets === null ? (
        <div>No values for the given input data</div>
      ) : (
        <div className="graph-wrapper">{component}</div>
      )}
    </div>
  );
};

export default SummaryPage;
