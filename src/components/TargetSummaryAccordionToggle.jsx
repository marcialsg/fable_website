import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import GreenCheck from "../assets/check.png";
import RedCross from "../assets/failed.png";

export default function TargetSummaryAccordionToggle({ targets }) {
  const headerStyle = { width: "20%", fontWeight: "800" };
  const rowStyle = { width: "20%", padding: 8 };

  // console.log("TargetSummaryAccordionToggle targets: ", targets);

  return (
    <div>
      <Accordion style={{ borderRadius: 8 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          style={{
            opacity: 0.8,
            padding: "32px 32px 32px 32px",
            backgroundColor: targets.color,
            borderRadius: 8,
            height: 50,
          }}
        >
          <div>
            <a className="body1Fable" style={{ fontWeight: "600" }}>
              {targets.domain}
            </a>
          </div>
        </AccordionSummary>

        <AccordionDetails>
          <div 
          
          style={{
            padding: "32px 32px 32px 32px",
          }}

          className=" col-lg-12 d-flex flex-column">
            <div className="d-flex justify-content-around pt-1 pb-1 ">
              <div style={{ textAlign:"center", width: "35%", fontWeight: "800" }}>
                Target
              </div>
              <div style={{ textAlign:"center", width: "21%", fontWeight: "800" }}>
                Current Trends
              </div>
              <div style={{ textAlign:"center", width: "21%", fontWeight: "800" }}>National Commitments</div>
              <div style={{ textAlign:"center", width: "21%", fontWeight: "800" }}>Global Sustainability</div>
            </div>

            <div>
              {targets.indicators.map((data) => {
                return (
                  <div className="d-flex justify-content-around pt-1 pb-1">
                    <div style={{ margin: "8px 10px 8px 10px", width: "35%" }}>
                      {data.indicator}
                    </div>
                    <div style={{ textAlign:"center", margin: "8px 10px 8px 10px", width: "21%" }}>
                      {data.currenttrends}
                    </div>
                    <div style={{ textAlign:"center", margin: "8px 10px 8px 10px", width: "21%" }}>
                      {data.nationalcommitments}
                    </div>
                    <div style={{ textAlign:"center", margin: "8px 10px 8px 10px", width: "21%" }}>
                      {data.globalsustainability}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
