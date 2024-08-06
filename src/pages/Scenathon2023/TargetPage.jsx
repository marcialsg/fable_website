import React, { useState, useEffect, Suspense } from "react";
import Biodiversity from "./Biodiversity";
import FoodSecurity from "./FoodSecurity";
import GHG from "./GHG";
import Water from "./Water";
import TradeReportPage from "./TradeReportPage";
import SummaryPage from "./SummaryPage";
import Socioeconomics from "./Socioeconomics";
import Typography from "@material-ui/core/Typography";
import NitrogenAndPhosphorus from "./NitrogenAndPhosphorus";

import "../../css/index.css";

const TargetPage = (props) => {
  

  const getItemTypography = (text) => {
    return (
  <h2 className="subtitleFable">{text}</h2>
    );
  };

  var target_data = require("../../assets/2023_target_data.json");

  const target = target_data.target_data[props.targetIndex].targetDomain;
  const indicator =
    target_data.target_data[props.targetIndex].indicators[props.indicatorIndex];

  let component = null;

  switch (target) {
    case target_data.target_data[0].targetDomain:
      component = (
        <SummaryPage
          targetIndex={props.targetIndex}
          indicatorIndex={props.indicatorIndex}
        />
      );
      break;

      case target_data.target_data[1].targetDomain:
        component = (
          <Suspense fallback={<div>Loading...</div>}>
            <FoodSecurity
              targetIndex={props.targetIndex}
              indicatorIndex={props.indicatorIndex}
              year={props.year}
              type={props.type}
              iteration= {props.iteration}
            />
          </Suspense>
        );
        break;

    case target_data.target_data[2].targetDomain:
      component = (
        <Biodiversity
          targetIndex={props.targetIndex}
          indicatorIndex={props.indicatorIndex}
          year={props.year}
          type={props.type}
          iteration= {props.iteration}
        />
      );
      break;
    case target_data.target_data[3].targetDomain:
      component = (
        <Water
          targetIndex={props.targetIndex}
          indicatorIndex={props.indicatorIndex}
          year={props.year}
          type={props.type}
          iteration= {props.iteration}
        />
      );
      break;

    case target_data.target_data[4].targetDomain:
      component = (
        <GHG
          targetIndex={props.targetIndex}
          indicatorIndex={props.indicatorIndex}
          year={props.year}
          type={props.type}
          iteration= {props.iteration}
        />
      );
      break;

      
    case target_data.target_data[5].targetDomain:
      component = (
        <Suspense fallback={<div>Loading...</div>}>
          <NitrogenAndPhosphorus
            targetIndex={props.targetIndex}
            indicatorIndex={props.indicatorIndex}
            year={props.year}
            type={props.type}
            iteration= {props.iteration}
          />
        </Suspense>
      );
      break;


    case target_data.target_data[6].targetDomain:
      component = (
        <Suspense fallback={<div>Loading...</div>}>
          <Socioeconomics
            targetIndex={props.targetIndex}
            indicatorIndex={props.indicatorIndex}
            year={props.year}
            type={props.type}
            iteration= {props.iteration}
          />
        </Suspense>
      );
      break;

    case target_data.target_data[7].targetDomain:
      component = (
        <TradeReportPage
          targetIndex={props.targetIndex}
          indicatorIndex={props.indicatorIndex}
          type={props.type}
          iteration= {props.iteration}
        />
      );
      break;

    default:
      return <h2> {target}</h2>;
  }

  return (
    <div className="graph-wrapperGeneral" >
      {getItemTypography(indicator, "black")}
      <div>{component}</div>
    </div>
  );
};

export default TargetPage;
